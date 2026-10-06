#!/usr/bin/env python3

import html
import json
import shutil
from pathlib import Path
from typing import Any, Iterator

import click

# A single taxon/tree-node record, matching inat_download.py's output.
_Taxon = dict[str, Any]

# The tree file inat_download.py writes inside each user's folder.
_TREE_FILENAME = "inat_tree.json"

# Ranks at species level or finer; anything else is a coarser "above species" ID.
_AT_OR_BELOW_SPECIES = frozenset(
    {
        "species",
        "hybrid",
        "subspecies",
        "variety",
        "subvariety",
        "form",
        "subform",
        "infrahybrid",
    }
)

# Full US state/territory names to their postal codes, so a place_guess written
# as "Texas" folds to the same "TX" bucket as "TX" and the ISO "US-TX" forms.
_US_STATE_CODES = {
    "alabama": "AL",
    "alaska": "AK",
    "arizona": "AZ",
    "arkansas": "AR",
    "california": "CA",
    "colorado": "CO",
    "connecticut": "CT",
    "delaware": "DE",
    "district of columbia": "DC",
    "florida": "FL",
    "georgia": "GA",
    "hawaii": "HI",
    "idaho": "ID",
    "illinois": "IL",
    "indiana": "IN",
    "iowa": "IA",
    "kansas": "KS",
    "kentucky": "KY",
    "louisiana": "LA",
    "maine": "ME",
    "maryland": "MD",
    "massachusetts": "MA",
    "michigan": "MI",
    "minnesota": "MN",
    "mississippi": "MS",
    "missouri": "MO",
    "montana": "MT",
    "nebraska": "NE",
    "nevada": "NV",
    "new hampshire": "NH",
    "new jersey": "NJ",
    "new mexico": "NM",
    "new york": "NY",
    "north carolina": "NC",
    "north dakota": "ND",
    "ohio": "OH",
    "oklahoma": "OK",
    "oregon": "OR",
    "pennsylvania": "PA",
    "rhode island": "RI",
    "south carolina": "SC",
    "south dakota": "SD",
    "tennessee": "TN",
    "texas": "TX",
    "utah": "UT",
    "vermont": "VT",
    "virginia": "VA",
    "washington": "WA",
    "west virginia": "WV",
    "wisconsin": "WI",
    "wyoming": "WY",
    "puerto rico": "PR",
}


def _region(place: str | None) -> str:
    """Extract a normalized state/region code from a free-text iNat place string.

    iNat's place_guess trails off with the administrative region then the country,
    e.g. "Yates Ave, Austin, TX, US". The second-to-last field is the state, but
    it appears as a code ("TX"), an ISO subdivision ("US-TX"), or a full name
    ("Texas"); all three are folded to a bare "TX". Returns "" when no region can
    be read (too few fields), which the filter treats as unmatched.
    """
    parts = [p.strip() for p in (place or "").split(",") if p.strip()]
    if len(parts) < 2:
        return ""
    token = parts[-2]
    if token.upper().startswith("US-"):
        token = token[3:]
    code = _US_STATE_CODES.get(token.lower(), token)
    return code.upper() if len(code) <= 3 else code


_PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.jade.min.css">
<style>
  /* Keep Pico's full-width form controls inline in the toolbars. */
  .controls, .filters {{ display: flex; flex-wrap: wrap; gap: .5rem .75rem; align-items: center; margin: .5rem 0 1rem; }}
  .filters label {{ display: inline-flex; align-items: center; gap: .35rem; }}
  .controls button, .filters select, .filters button {{ width: auto; margin: 0; }}
  #match-count {{ margin-left: auto; }}
  /* Tree indentation, thumbnail sizing, and JS-driven row hiding. */
  .children {{ margin-left: .5rem; padding-left: .95rem; }}
  img {{ width: 48px; height: 48px; object-fit: cover; vertical-align: middle; border-radius: 3px; }}
  .filtered {{ display: none !important; }}
  /* Restore word spacing between the inline name / rank / common / count spans. */
  .rank, .common, .count {{ margin-left: .35rem; }}
  .obs {{ display: flex; align-items: center; gap: .4rem; }}
</style>
</head>
<body>
<main>
<hgroup>
<h1>{title}</h1>
<p>{summary_line}</p>
</hgroup>
{nav}
{content}
</main>
<script type="module" src="tree_page.js"></script>
</body>
</html>
"""


# The four views plus the landing page, in nav order. Both generated pages
# (tree, missed) and the static pages (landing, map, rarest) live side by side
# in the publish/ folder, so these are plain sibling links.
_PAGES = [
    ("index.html", "Home"),
    ("missed.html", "Missed common things"),
    ("tree.html", "Taxonomy tree"),
    ("grid_viewer.html", "Map"),
    ("rarest.html", "Rarest"),
]


def _nav(current: str) -> str:
    """A shared nav bar linking the views; the current page is shown un-linked."""
    items = []
    for href, label in _PAGES:
        if href == current:
            items.append(f"<li>{html.escape(label)}</li>")
        else:
            items.append(f'<li><a href="{href}">{html.escape(label)}</a></li>')
    return "<nav><ul>" + "".join(items) + "</ul></nav>"


@click.command()
@click.argument("source", type=click.Path(exists=True, path_type=Path))
@click.option(
    "--output",
    "-o",
    type=click.Path(path_type=Path),
    help="Path for the tree page; missed.html is written beside it (defaults to tree.html next to the source).",
)
@click.option("--title", help="Page heading (defaults to the input file's stem).")
@click.option(
    "--user",
    help="iNaturalist login for observation links (defaults to the one stamped in the file).",
)
@click.option(
    "--fold-chains/--no-fold-chains",
    default=True,
    help="Collapse runs of single-child pass-through taxa into one breadcrumb row (default: on).",
)
def render_tree(
    source: Path,
    output: Path | None,
    title: str | None,
    user: str | None,
    fold_chains: bool,
) -> None:
    """Render an iNaturalist taxonomic-tree JSON file as a collapsible HTML page.

    Reads the nested tree produced by inat_download.py and writes an indented,
    collapsible nested list. Observation counts are rolled up to every level,
    each taxon links to its iNaturalist page, and every observed taxon expands
    to a list of the user's individual observations, each linking to its own
    iNaturalist page. When the user is known, the rolled-up count links to that
    user's observations under the taxon. By default, runs of single-child
    pass-through taxa collapse into one breadcrumb row so deep non-branching
    lineages don't dominate the layout.

    Args:
        source: Either a user folder (holding inat_tree.json) or the JSON file
            itself, mirroring how inat_download.py addresses users by folder.
        output: Path for the tree page; missed.html is written beside it.
            Defaults to tree.html next to the source.
        title: Heading for the tree page; defaults to "Taxonomy tree".
        user: iNaturalist login for observation links; overrides the file's.
        fold_chains: Collapse single-child chains into breadcrumbs.
    """
    # Accept a user folder as shorthand for the tree file it contains.
    tree_json = source / _TREE_FILENAME if source.is_dir() else source
    if not tree_json.is_file():
        raise click.BadParameter(f"no tree file at {tree_json}", param_hint="SOURCE")

    data = json.loads(tree_json.read_text(encoding="utf-8"))
    # inat_download.py writes {"user_login", "user", "downloaded_at", "tree"};
    # tolerate both an older {"user_login", "tree"} dict and a bare list.
    display_name: str | None = None
    downloaded_at: str | None = None
    if isinstance(data, dict):
        roots: list[_Taxon] = data.get("tree", [])
        user_info = data.get("user") or {}
        user = user or user_info.get("login") or data.get("user_login")
        display_name = user_info.get("name") or user or data.get("user_login")
        downloaded_at = data.get("downloaded_at")
    else:
        roots = data

    # `-o` names the tree page; the blind-spots page is written alongside it so
    # the whole set (landing, missed, tree, map, rarest) lands in one folder.
    output = output or (tree_json.parent / "tree.html")
    missed_output = output.parent / "missed.html"
    for root in roots:
        _roll_up_counts(root)

    body = "\n".join(
        line for root in roots for line in _render_node(root, user, fold_chains)
    )
    summary = _summary_line(display_name, roots, downloaded_at)

    # Tree page: the filter bar, expand/collapse controls, and the taxonomy tree.
    tree_content = (
        _filter_bar(_collect_regions(roots))
        + '\n<div class="controls">\n'
        "  <button onclick=\"document.querySelectorAll('details').forEach(d => d.open = true)\">Expand all</button>\n"
        "  <button onclick=\"document.querySelectorAll('details').forEach(d => d.open = false)\">Collapse all</button>\n"
        '</div>\n<div class="tree">\n' + body + "\n</div>"
    )
    tree_page = _PAGE_TEMPLATE.format(
        title=html.escape(title or "Taxonomy tree"),
        summary_line=summary,
        nav=_nav("tree.html"),
        content=tree_content,
    )
    output.write_text(tree_page, encoding="utf-8")

    # Missed-common-things page: the live blind-spots panel, standalone.
    missed_content = _blind_spots_panel(user, _observed_taxon_ids(roots)) or (
        '<p class="bs-intro">Set an observer (--user) to compute blind spots.</p>'
    )
    missed_page = _PAGE_TEMPLATE.format(
        title="Missed common things",
        summary_line=summary,
        nav=_nav("missed.html"),
        content=missed_content,
    )
    missed_output.write_text(missed_page, encoding="utf-8")
    # The viewers' JS is built separately (`pnpm build`); place the tree
    # page's bundle beside the pages so their <script src> resolves.
    built_js = Path(__file__).parent / "dist" / "tree_page.js"
    if built_js.is_file():
        shutil.copy2(built_js, output.parent / "tree_page.js")
    else:
        click.echo(f"warning: {built_js} not built yet — run `pnpm build`", err=True)
    click.echo(f"Wrote {output.resolve()} and {missed_output.resolve()}")


def _collect_regions(nodes: list[_Taxon]) -> list[str]:
    """Every distinct normalized region across the forest's observations, sorted."""
    regions: set[str] = set()

    def walk(node: _Taxon) -> None:
        for obs in node.get("observations") or []:
            region = _region(obs.get("place"))
            if region:
                regions.add(region)
        for child in node.get("children", []):
            walk(child)

    for node in nodes:
        walk(node)
    return sorted(regions)


def _filter_bar(regions: list[str]) -> str:
    """Build the filter controls, with a location dropdown drawn from `regions`."""
    region_options = "".join(
        f'<option value="{html.escape(r)}">{html.escape(r)}</option>' for r in regions
    )
    return f"""<div class="filters">
  <label>Location
    <select id="f-region"><option value="">All</option>{region_options}</select>
  </label>
  <label>Establishment
    <select id="f-establishment">
      <option value="">All</option>
      <option value="native">Native</option>
      <option value="introduced">Introduced</option>
    </select>
  </label>
  <label>Wild / captive
    <select id="f-captive">
      <option value="">All</option>
      <option value="0">Wild</option>
      <option value="1">Captive</option>
    </select>
  </label>
  <label>ID level
    <select id="f-coarse">
      <option value="">All</option>
      <option value="0">To species</option>
      <option value="1">Above species</option>
    </select>
  </label>
  <button type="button" id="f-reset">Reset</button>
  <span id="match-count"></span>
</div>"""


def _summary_line(
    display_name: str | None, roots: list[_Taxon], downloaded_at: str | None
) -> str:
    """Build the sub-heading: observer, taxon count, and the download date."""
    bits = []
    if display_name:
        bits.append(html.escape(display_name))
    bits.append(f"{_count_nodes(roots)} taxa")
    if downloaded_at:
        # Stamped as an ISO8601 instant; the date alone reads well here.
        bits.append(f"downloaded {html.escape(downloaded_at[:10])}")
    return " &middot; ".join(bits)


def _observed_taxon_ids(nodes: list[_Taxon]) -> set[int]:
    """Every taxon id the user has actually recorded (tree nodes carrying observations).

    Handed to the blind-spots panel so its client-side script can mark which of
    the species most-observed near you are already on your life list (✓) versus
    still a gap (○).
    """
    seen: set[int] = set()

    def walk(node: _Taxon) -> None:
        if node.get("observations") or node.get("count"):
            seen.add(node.get("id"))
        for child in node.get("children", []):
            walk(child)

    for node in nodes:
        walk(node)
    return seen


# Distance (km) of the blind-spots circle, and how many species to list per group.
# Mirrored into the client script's constants; keep the two in step if changed.
_BLIND_SPOT_RADIUS_KM = 100
_BLIND_SPOT_PER_GROUP = 10


def _blind_spots_panel(user: str | None, observed_ids: set[int]) -> str:
    """The static shell for the single geolocation-driven blind-spots panel.

    Blind spots are the species most observed *this month* within
    `_BLIND_SPOT_RADIUS_KM` of where the viewer is right now, marked by whether
    they have recorded each. Both the circle (browser geolocation) and the season
    (the viewer's current month) are only known at view time, so unlike the rest
    of the page this panel has no server-rendered rows: it ships a button, an
    empty results container, and the data the client script needs (the observer's
    login and the taxon ids they already have), then fills itself in from the live
    iNaturalist API when the button is pressed. Each species is tagged with how
    much of its yearly local activity falls in the current month, so a seasonal
    "go now" target reads differently from a year-round resident. Rendered empty
    and inert when there is no login to attribute the query to.
    """
    if not user:
        return ""

    # Embedded as JSON for the client script; escape "<" so the observed-id list
    # or login can never close the <script> tag early.
    payload = json.dumps({"user": user, "observed": sorted(observed_ids)}).replace(
        "<", "\\u003c"
    )
    heading = (
        f"Blind spots in season within {_BLIND_SPOT_RADIUS_KM} km of you "
        "(○ = active near you now that you haven’t recorded)"
    )
    return (
        '<details class="coverage blindspots" id="blind-spots">'
        f"<summary>{heading}</summary>"
        '<p class="bs-intro">Uses your browser location and the current month to '
        f"find the species reported most within {_BLIND_SPOT_RADIUS_KM} km right "
        "now, marks which you are still missing, and flags the ones concentrated "
        "in this season. Your location stays in your browser — it is sent only to "
        "iNaturalist to run the query, never stored.</p>"
        '<button type="button" id="bs-locate">Show blind spots near me</button>'
        '<span id="bs-status" class="bs-status"></span>'
        '<div id="bs-results"></div>'
        f'<script type="application/json" id="bs-data">{payload}</script>'
        "</details>"
    )


def _roll_up_counts(node: _Taxon) -> int:
    """Set each node's `total` to its own count plus every descendant's, returning it."""
    total = node.get("count") or 0
    for child in node.get("children", []):
        total += _roll_up_counts(child)
    node["total"] = total
    return total


def _render_node(node: _Taxon, user: str | None, fold_chains: bool) -> Iterator[str]:
    """Yield the HTML lines for a node, its child taxa, and its observations.

    With fold_chains on, a run of single-child pass-through taxa starting at
    `node` is collapsed to one breadcrumb row ending at the first taxon that
    branches, is a leaf, or has its own observations.
    """
    chain = _collapse_chain(node) if fold_chains else [node]
    terminus = chain[-1]
    label = _chain_label(chain, user)

    children = terminus.get("children") or []
    observations = terminus.get("observations") or []
    if not children and not observations:
        yield f'<div class="leaf">{label}</div>'
        return

    yield f"<details open><summary>{label}</summary>"
    yield '<div class="children">'
    for child in children:
        yield from _render_node(child, user, fold_chains)
    # These observations hang directly off `terminus`, so they share its rank;
    # pass that down as the per-observation "above species" filter flag.
    coarse = _is_above_species(terminus.get("rank"))
    for obs in observations:
        yield _observation_item(obs, coarse)
    yield "</div></details>"


def _collapse_chain(node: _Taxon) -> list[_Taxon]:
    """Return the run of single-child pass-through taxa starting at `node`.

    Walks down while each node has exactly one child and no observations of its
    own, stopping at (and including) the first taxon that branches, is a leaf,
    or carries observations. A non-degenerate `node` yields just `[node]`.
    """
    chain = [node]
    while len(node.get("children") or []) == 1 and not node.get("observations"):
        node = node["children"][0]
        chain.append(node)
    return chain


def _chain_label(chain: list[_Taxon], user: str | None) -> str:
    """Join a collapsed chain into one label: linked crumbs, then the full terminus."""
    if len(chain) == 1:
        return _label(chain[0], user)
    crumbs = [_crumb(node) for node in chain[:-1]]
    crumbs.append(_label(chain[-1], user))
    return '<span class="chain-sep"> &rsaquo; </span>'.join(crumbs)


def _crumb(node: _Taxon) -> str:
    """A single breadcrumb: the taxon's linked name, with its rank as a tooltip."""
    taxon_id = node.get("id")
    name = html.escape(str(node.get("name") or f"taxon {taxon_id}"))
    href = f"https://www.inaturalist.org/taxa/{taxon_id}"
    rank = html.escape(str(node.get("rank") or ""))
    return (
        f'<a class="crumb" href="{href}" target="_blank" rel="noopener"'
        f' title="{rank}">{name}</a>'
    )


def _chip(kind: str, text: str) -> str:
    """A small status pill; `kind` selects the color, `text` is the visible label."""
    return f'<span class="chip chip-{kind}">{text}</span>'


def _is_above_species(rank: str | None) -> bool:
    """True when a rank is coarser than species (genus and up), i.e. not ID'd to species."""
    return bool(rank) and rank not in _AT_OR_BELOW_SPECIES


def _observation_item(obs: _Taxon, coarse: bool) -> str:
    """Build the HTML for a single observation: a thumbnail and date linking to iNat.

    Introduced, captive, and above-species are all facts about this one sighting,
    so their chips ride on the observation row, not the taxon. `coarse` is the
    owning taxon's above-species status (an observation identified no finer than
    its taxon). The data- attributes drive the client-side ID-level filtering.
    """
    obs_id = obs.get("id")
    href = f"https://www.inaturalist.org/observations/{obs_id}"
    label = html.escape(str(obs.get("date") or f"observation {obs_id}"))

    establishment = "introduced" if obs.get("introduced") else "native"
    attrs = (
        f' data-region="{html.escape(_region(obs.get("place")))}"'
        f' data-establishment="{establishment}"'
        f' data-captive="{"1" if obs.get("captive") else "0"}"'
        f' data-coarse="{"1" if coarse else "0"}"'
    )
    line = f'<div class="obs"{attrs}><a class="obs-link" href="{href}" target="_blank" rel="noopener">'
    if obs.get("photo"):
        # Stored url is the 75px square; the 240px "small" variant stays crisp at 64px.
        thumb = html.escape(obs["photo"].replace("/square.", "/small."))
        line += f'<img class="obs-thumb" src="{thumb}" alt="" loading="lazy">'
    line += f"{label}</a>"
    if obs.get("place"):
        line += f'<span class="place">{html.escape(obs["place"])}</span>'
    if obs.get("introduced"):
        line += _chip("introduced", "introduced")
    if obs.get("captive"):
        line += _chip("captive", "captive")
    if coarse:
        line += _chip("coarse", "above species")
    return line + "</div>"


def _label(node: _Taxon, user: str | None) -> str:
    """Build the inner HTML for a single taxon: linked name, rank, common name, count."""
    taxon_id = node.get("id")
    name = html.escape(str(node.get("name") or f"taxon {taxon_id}"))
    taxon_href = f"https://www.inaturalist.org/taxa/{taxon_id}"

    parts = [
        f'<a class="taxon" href="{taxon_href}" target="_blank" rel="noopener">{name}</a>'
    ]
    if node.get("rank"):
        parts.append(f'<span class="rank">{html.escape(node["rank"])}</span>')
    if node.get("common_name"):
        parts.append(
            f'<span class="common">&mdash; {html.escape(node["common_name"])}</span>'
        )

    total = node.get("total")
    if total:
        if user:
            obs_href = (
                f"https://www.inaturalist.org/observations"
                f"?user_id={user}&taxon_id={taxon_id}"
            )
            parts.append(
                f'<a class="count" href="{obs_href}" target="_blank" rel="noopener"'
                f' title="observations">({total})</a>'
            )
        else:
            parts.append(f'<span class="count">({total})</span>')
    return "".join(parts)


def _count_nodes(nodes: list[_Taxon]) -> int:
    """Total taxa in the forest, counting every node once."""
    return sum(1 + _count_nodes(n.get("children", [])) for n in nodes)


if __name__ == "__main__":
    render_tree()
