#!/usr/bin/env python3
from http import HTTPStatus
from http.client import HTTPResponse
from json import dumps, loads
from time import sleep
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import click
from requests import Timeout, ConnectionError, Session

# A single taxon/tree-node record decoded from the iNat JSON.
_Taxon = dict[str, Any]


@click.command()
@click.argument("username")
def download_inaturalist_tree(username: str) -> None:

    tree_path = Path(__file__).resolve().parent / username / "inat_tree.json"

    if tree_path.exists():
        prior = loads(tree_path.read_text(encoding="utf-8"))
        prior_observed, prior_known, prior_obs = _flatten_prior(prior.get("tree", []))
        cutoff = prior.get("downloaded_at")
    else:
        click.echo(f"No existing data for {username}; downloading the full history.")
        prior_observed: dict[int, _Taxon] = {}
        prior_known: dict[int, _Taxon] = {}
        prior_obs: dict[int, _Taxon] = {}
        cutoff = None

    downloaded_at = _utcnow_iso()

    session = Session()
    session.headers["User-Agent"] = "personal downloader"
    fetched_observed, fetched_obs, user = _fetch_observations(session, username, cutoff)

    if cutoff:
        click.echo(
            f"Fetched {len(fetched_obs)} changed observation(s); "
            f"merging into {len(prior_obs)} already on file."
        )
    observed_all = {**prior_observed, **fetched_observed}
    observations_by_id = {**prior_obs, **fetched_obs}
    observations_by_taxon = _group_by_taxon(observations_by_id)
    if not observations_by_taxon:
        click.echo("No observations found; nothing to write.")
        return
    observed = {taxon_id: observed_all[taxon_id] for taxon_id in observations_by_taxon}
    ancestors = _resolve_ancestors(session, observed, prior_known)
    tree = _build_tree(observed, ancestors, observations_by_taxon)
    user = user or (prior or {}).get("user") or {"login": username}
    document = {
        "user_login": username,
        "user": user,
        "downloaded_at": downloaded_at,
        "tree": tree,
    }
    (Path(__file__).resolve().parent / username).mkdir(parents=True, exist_ok=True)
    tree_path.write_text(
        dumps(document, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    total_observations = sum(len(records) for records in observations_by_taxon.values())
    who = user.get("name") or user.get("login") or username
    click.echo(
        f"\nFinished. {total_observations} observations across {len(observed)} "
        f"observed taxa ({len(observed) + len(ancestors)} tree nodes) for {who} "
        f"saved to {tree_path.resolve()}"
    )


def _fetch_observations(
    session: Session, username: str, updated_since: str | None = None
) -> tuple[dict[int, _Taxon], dict[int, _Taxon], _Taxon]:
    per_page = 200
    max_pages = 50

    observed: dict[int, _Taxon] = {}
    obs_by_id: dict[int, _Taxon] = {}
    user: _Taxon = {}
    unplaced = 0
    page = 1

    while True:
        params: dict[str, str | int] = {
            "user_id": username,
            "per_page": per_page,
            "page": page,
            "order_by": "observed_on",
            "order": "desc",
        }
        if updated_since:
            params["updated_since"] = updated_since

        data = _get(session, "observations", **params)
        results = data.get("results", [])
        if not results:
            break

        for obs in results:
            # Every observation names its observer identically; grab it once so
            # the file can show the human's name, not just the login slug.
            if not user:
                observer = obs.get("user") or {}
                if observer:
                    user = {
                        "id": observer.get("id"),
                        "login": observer.get("login"),
                        "name": observer.get("name"),
                    }

            taxon: _Taxon = obs.get("taxon") or {}
            taxon_id: int | None = taxon.get("id")
            if taxon_id is None:
                unplaced += 1  # no identification -> no taxon to hang it under
                continue
            if taxon_id not in observed:
                # `ancestry` is the clean root-to-parent id chain (self excluded).
                ancestry = taxon.get("ancestry") or ""
                observed[taxon_id] = {
                    "id": taxon_id,
                    "name": taxon.get("name"),
                    "rank": taxon.get("rank"),
                    "common_name": taxon.get("preferred_common_name"),
                    "ancestor_ids": [int(a) for a in ancestry.split("/") if a],
                }
            photos = obs.get("photos") or []
            obs_id = obs.get("id")
            record: _Taxon = {
                "id": obs_id,
                "date": obs.get("observed_on"),
                "place": obs.get("place_guess"),
                # The default photo url is the 75px square thumbnail.
                "photo": photos[0].get("url") if photos else None,
                # Kept only for grouping/merging; stripped before serialization.
                "taxon_id": taxon_id,
            }
            # `captive` and `introduced` are place-relative facts about this one
            # observation, not the taxon: the same species can be wild here and
            # captive/cultivated there, native here and introduced there. iNat
            # reports `introduced` on the taxon computed for this observation's
            # place, and names the wild-or-not flag `captive` (matched here). Store
            # only the true case; an absent flag reads as wild / native-or-unknown.
            if obs.get("captive"):
                record["captive"] = True
            if taxon.get("introduced"):
                record["introduced"] = True
            obs_by_id[obs_id] = record

        click.echo(
            f"Fetched observations page {page} "
            f"({len(obs_by_id)} observations, {len(observed)} taxa so far)..."
        )

        if page * per_page >= data.get("total_results", 0):
            break
        if page >= max_pages:
            click.echo("Reached the 10,000-observation offset limit; stopping.")
            break
        page += 1

    if unplaced:
        click.echo(f"Skipped {unplaced} observation(s) without an identified taxon.")

    return observed, obs_by_id, user


def _resolve_ancestors(
    session: Session,
    observed: dict[int, _Taxon],
    known: dict[int, _Taxon],
) -> dict[int, _Taxon]:
    """Return id->detail for every ancestor taxon referenced by an observed leaf.

    Detail already on hand (from a prior tree on an update run) is reused as-is;
    the taxa endpoint is hit only for ancestor ids never seen before. On a full
    download `known` is empty, so every ancestor is resolved from scratch.
    """
    ancestor_ids: set[int] = set()
    for leaf in observed.values():
        ancestor_ids.update(leaf["ancestor_ids"])
    ancestor_ids -= observed.keys()

    resolved = {tid: known[tid] for tid in ancestor_ids if tid in known}
    missing = ancestor_ids - resolved.keys()
    if missing:
        click.echo(f"Resolving {len(missing)} ancestor taxa...")
        resolved.update(_resolve_taxa(session, missing))
    return resolved


def _resolve_taxa(session: Session, taxon_ids: set[int]) -> dict[int, _Taxon]:
    """Look up name/rank/common name for each taxon id via the batch taxa endpoint."""
    # iNaturalist caps a multi-taxon lookup (/taxa/id1,id2,...) at 30 ids per request.
    taxa_lookup_batch = 30

    resolved: dict[int, _Taxon] = {}
    ids = sorted(taxon_ids)

    for start in range(0, len(ids), taxa_lookup_batch):
        chunk = ids[start : start + taxa_lookup_batch]
        joined = ",".join(str(taxon_id) for taxon_id in chunk)
        data = _get(session, f"taxa/{joined}")

        for taxon in data.get("results", []):
            resolved[taxon["id"]] = {
                "id": taxon["id"],
                "name": taxon.get("name"),
                "rank": taxon.get("rank"),
                "common_name": taxon.get("preferred_common_name"),
            }

        click.echo(f"Resolved {len(resolved)}/{len(ids)} ancestor taxa...")

    return resolved


def _flatten_prior(
    tree: list[_Taxon]
) -> tuple[dict[int, _Taxon], dict[int, _Taxon], dict[int, _Taxon]]:
    observed: dict[int, _Taxon] = {}
    known: dict[int, _Taxon] = {}
    obs_by_id: dict[int, _Taxon] = {}

    def walk(node: _Taxon, ancestor_ids: list[int]) -> None:
        taxon_id = node["id"]
        detail = {key: node.get(key) for key in ("id", "name", "rank", "common_name")}
        known[taxon_id] = detail
        records = node.get("observations")
        if records:
            observed[taxon_id] = {**detail, "ancestor_ids": list(ancestor_ids)}
            for record in records:
                obs_by_id[record["id"]] = {**record, "taxon_id": taxon_id}
        for child in node.get("children", []):
            walk(child, ancestor_ids + [taxon_id])

    for root in tree:
        walk(root, [])
    return observed, known, obs_by_id


def _group_by_taxon(obs_by_id: dict[int, _Taxon]) -> dict[int, list[_Taxon]]:
    """Regroup id-keyed observation records under their taxon, dropping the tag.

    Grouping from the flat id map (rather than carrying a per-taxon list through
    the merge) is what lets a re-identified observation land under its new taxon
    with no stale copy left behind under the old one.
    """
    grouped: dict[int, list[_Taxon]] = {}
    for record in obs_by_id.values():
        taxon_id = record["taxon_id"]
        grouped.setdefault(taxon_id, []).append(
            {key: value for key, value in record.items() if key != "taxon_id"}
        )
    return grouped


def _build_tree(
    observed: dict[int, _Taxon],
    ancestors: dict[int, _Taxon],
    obs_by_taxon: dict[int, list[_Taxon]],
) -> list[_Taxon]:
    """Assemble a nested tree from each observed taxon's ancestor chain.

    Every taxon id maps to a single node; a node is reached along the path
    ancestor_ids + [leaf id]. Observed taxa carry their observation count and
    the list of individual observation records (most recent first). Returns the
    list of root nodes (in practice a single "Life" root).
    """
    # One node object per taxon id, seeded with the best detail we have.
    nodes: dict[int, _Taxon] = {}

    def node_for(taxon_id: int) -> _Taxon:
        if taxon_id not in nodes:
            detail = (
                observed.get(taxon_id) or ancestors.get(taxon_id) or {"id": taxon_id}
            )
            nodes[taxon_id] = {
                "id": taxon_id,
                "name": detail.get("name"),
                "rank": detail.get("rank"),
                "common_name": detail.get("common_name"),
                "_children": {},
            }
            # Only observed taxa carry observations; the count is their tally.
            records = obs_by_taxon.get(taxon_id)
            if records:
                nodes[taxon_id]["count"] = len(records)
                nodes[taxon_id]["observations"] = sorted(
                    records, key=lambda r: r.get("date") or "", reverse=True
                )
        return nodes[taxon_id]

    child_ids: set[int] = set()
    for leaf in observed.values():
        path = list(leaf["ancestor_ids"]) + [leaf["id"]]
        for parent_id, child_id in zip(path, path[1:]):
            parent = node_for(parent_id)
            node_for(child_id)
            parent["_children"][child_id] = nodes[child_id]
            child_ids.add(child_id)
        node_for(path[0])

    def finalize(node: _Taxon, seen: frozenset[int]) -> _Taxon:
        # Non-mutating: iNat taxon-change grafts can hand a node two parents, so
        # the same node object may be finalized more than once. `seen` tracks the
        # ancestry on the current path and breaks any (pathological) cycle.
        result = {k: v for k, v in node.items() if k != "_children" and v is not None}
        children = sorted(node["_children"].values(), key=lambda n: n.get("name") or "")
        visible = [c for c in children if c["id"] not in seen]
        if visible:
            branch = seen | {node["id"]}
            result["children"] = [finalize(child, branch) for child in visible]
        return result

    roots = [nodes[i] for i in nodes if i not in child_ids]
    return [
        finalize(root, frozenset())
        for root in sorted(roots, key=lambda n: n.get("name") or "")
    ]


def _utcnow_iso() -> str:
    stamp = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    return stamp.replace("+00:00", "Z")


def _get(session: Session, path: str, **params: str | int) -> dict[str, Any]:
    request_pause_seconds = 0.7
    max_retries = 4
    url = f"https://api.inaturalist.org/v1/{path}"
    for attempt in range(1, max_retries + 1):
        try:
            response = session.get(url, params=params, timeout=30)
            if response.status_code < 500 and response.status_code != HTTPStatus.TOO_MANY_REQUESTS:
                response.raise_for_status()
                sleep(request_pause_seconds)
                return response.json()
            reason = f"HTTP {response.status_code}"
        except (ConnectionError, Timeout) as exc:
            reason = exc.__class__.__name__
            if attempt == max_retries:
                raise
        else:
            if attempt == max_retries:
                response.raise_for_status()

        backoff = request_pause_seconds * 2**attempt
        click.echo(f"  request failed ({reason}); retrying in {backoff:.1f}s...")
        sleep(backoff)
    raise RuntimeError("unreachable")  # loop either returns or raises


if __name__ == "__main__":
    download_inaturalist_tree()
