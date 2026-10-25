import {main, type Observation, type TaxonNode} from './tree.ts';
import {region} from './region.ts';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const form = byId<HTMLFormElement>('form');
const observer = byId<HTMLInputElement>('observer');
const loadBtn = byId<HTMLButtonElement>('loadBtn');
const status = byId('status');
const tree = byId('tree');

const fRegion = byId<HTMLSelectElement>('f-region');
const filters = [fRegion, byId<HTMLSelectElement>('f-establishment'), byId<HTMLSelectElement>('f-captive'), byId<HTMLSelectElement>('f-coarse')];
const matchCount = byId('match-count');

/** Ranks at species level or finer; anything coarser is an "above species" ID. */
const AT_OR_BELOW_SPECIES = new Set(['species', 'hybrid', 'subspecies', 'variety', 'subvariety', 'form', 'subform', 'infrahybrid']);
const isAboveSpecies = (rank: string) => rank !== '' && !AT_OR_BELOW_SPECIES.has(rank);

const taxonUrl = (id: number) => `https://www.inaturalist.org/taxa/${id}`;
const obsUrl = (id: number) => `https://www.inaturalist.org/observations/${id}`;
const userTaxonUrl = (taxonId: number) => `https://www.inaturalist.org/observations?user_id=${currentUser}&taxon_id=${taxonId}`;

let currentUser = '';

/** Terse `createElement` + assign props + append children. */
function el(tag: string, props: Record<string, unknown> = {}, ...children: (Node | string)[]) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

/** A taxon's label: linked name, rank, common name, and a count linking to the
 *  user's observations under it. */
function taxonLabel(node: TaxonNode): (Node | string)[] {
  const label: (Node | string)[] = [
    el('a', {href: taxonUrl(node.id), target: '_blank', rel: 'noopener', textContent: node.name}),
  ];
  if (node.rank) label.push(el('small', {textContent: ` ${node.rank}`}));
  if (node.common) label.push(el('small', {textContent: ` — ${node.common}`}));
  if (node.total) label.push(el('a', {href: userTaxonUrl(node.id), target: '_blank', rel: 'noopener', title: 'observations', textContent: ` (${node.total})`}));
  return label;
}

/** Collapse a run of single-child pass-through taxa (one child, no observations
 *  of their own) into one breadcrumb, stopping at the first branch/leaf/observed. */
function collapseChain(node: TaxonNode): TaxonNode[] {
  const chain = [node];
  let last = node;
  while (last.children.length === 1 && last.observations.length === 0) {
    last = last.children[0]!;
    chain.push(last);
  }
  return chain;
}

function chainLabel(chain: TaxonNode[]): (Node | string)[] {
  if (chain.length === 1) return taxonLabel(chain[0]!);
  const label: (Node | string)[] = [];
  for (const crumb of chain.slice(0, -1)) {
    label.push(el('a', {href: taxonUrl(crumb.id), target: '_blank', rel: 'noopener', title: crumb.rank, textContent: crumb.name}));
    label.push(el('span', {className: 'chain-sep', textContent: ' › '}));
  }
  label.push(...taxonLabel(chain[chain.length - 1]!));
  return label;
}

function obsRow(obs: Observation, aboveSpecies: boolean): HTMLElement {
  const link = el('a', {href: obsUrl(obs.id), target: '_blank', rel: 'noopener'});
  if (obs.photo) link.append(el('img', {src: obs.photo, alt: '', loading: 'lazy'}));
  link.append(obs.date ?? `observation ${obs.id}`);

  const row = el('div', {className: 'obs'}, link);
  if (obs.place) row.append(el('small', {textContent: obs.place}));
  if (obs.introduced) row.append(el('small', {textContent: ' · introduced'}));
  if (obs.captive) row.append(el('small', {textContent: ' · captive'}));
  if (aboveSpecies) row.append(el('small', {textContent: ' · above species'}));

  // These data-* attributes drive the client-side filtering below.
  Object.assign(row.dataset, {
    region: region(obs.place),
    establishment: obs.introduced ? 'introduced' : 'native',
    captive: obs.captive ? '1' : '0',
    coarse: aboveSpecies ? '1' : '0',
  });
  return row;
}

function renderNode(node: TaxonNode): HTMLElement {
  const chain = collapseChain(node);
  const terminus = chain[chain.length - 1]!;
  const aboveSpecies = isAboveSpecies(terminus.rank);
  const body = [...terminus.children.map(renderNode), ...terminus.observations.map(o => obsRow(o, aboveSpecies))];
  const label = chainLabel(chain);
  if (!body.length) return el('div', {className: 'leaf'}, ...label);
  return el('details', {open: true},
    el('summary', {}, ...label),
    el('div', {className: 'children'}, ...body));
}

/** Show only observations matching the active filters, rolling taxa up so a node
 *  stays only while it still holds a visible observation. */
function applyFilters() {
  const active = filters.some(f => f.value);
  let visible = 0;
  tree.querySelectorAll<HTMLElement>('.obs').forEach(o => {
    const show = filters.every(f => !f.value || o.dataset[f.dataset.key!] === f.value);
    o.classList.toggle('filtered', !show);
    if (show) visible += 1;
  });
  tree.querySelectorAll<HTMLDetailsElement>('details').forEach(d => {
    const has = d.querySelector('.obs:not(.filtered)') !== null;
    d.classList.toggle('filtered', active && !has);
    if (active && has) d.open = true;
  });
  // Leaf taxa carry no observations, so nothing matches once a filter is on.
  tree.querySelectorAll<HTMLElement>('.leaf').forEach(l => l.classList.toggle('filtered', active));
  matchCount.textContent = active ? `${visible} matching observations` : '';
}

function populateRegions() {
  const found = [...tree.querySelectorAll<HTMLElement>('.obs')].map(o => o.dataset.region).filter((r): r is string => !!r);
  const regions = [...new Set(found)].sort();
  fRegion.replaceChildren(el('option', {value: '', textContent: 'All'}), ...regions.map(r => el('option', {value: r, textContent: r})));
}

async function load() {
  currentUser = observer.value.trim();
  if (!currentUser) return;
  loadBtn.disabled = true;
  tree.replaceChildren();
  filters.forEach(f => { f.value = ''; });
  status.textContent = 'Loading…';
  try {
    const roots = await main(currentUser);
    tree.replaceChildren(...roots.map(renderNode));
    populateRegions();
    applyFilters();
    status.textContent = `${roots.reduce((sum, r) => sum + r.total, 0)} observations`;
  } catch (err) {
    status.textContent = `Error: ${(err as Error).message}`;
  } finally {
    loadBtn.disabled = false;
  }
}

const setAllOpen = (open: boolean) => tree.querySelectorAll('details').forEach(d => { d.open = open; });

form.addEventListener('submit', (event) => { event.preventDefault(); void load(); });
byId<HTMLButtonElement>('expand').addEventListener('click', () => setAllOpen(true));
byId<HTMLButtonElement>('collapse').addEventListener('click', () => setAllOpen(false));
filters.forEach(f => f.addEventListener('change', applyFilters));
byId<HTMLButtonElement>('f-reset').addEventListener('click', () => {
  filters.forEach(f => { f.value = ''; });
  applyFilters();
});

void load();
