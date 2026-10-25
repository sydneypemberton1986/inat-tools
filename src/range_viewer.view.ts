// iNaturalist range / observation map viewer, split by child taxon.
//
// For a chosen taxon we pull its direct children and overlay each in a distinct
// color so their ranges are visually separable. Two data sources:
//   * "Range polygons" — expert range tiles (tiles.inaturalist.org/v1/taxon_ranges),
//     which exist mainly at species level.
//   * "Observations" — the community grid (api.inaturalist.org/v1/grid), which
//     reaches subspecies. Both are raster tiles that accept ?color= and CORS.
// Taxon lookups (search, detail, bounds) go through the v2 JSON client in range.ts.

import {fetchBounds, fetchTaxon, searchTaxa, type Child, type Suggestion, type Taxon} from './range.ts';

// The Leaflet global comes from a CDN <script> in the page; type it without
// bundling so `L` stays a runtime global but is fully checked.
declare const L: typeof import('leaflet');

const RANGE_TILE_URL = 'https://tiles.inaturalist.org/v1/taxon_ranges/{id}/{z}/{x}/{y}.png?color={color}';
const GRID_TILE_URL = 'https://api.inaturalist.org/v1/grid/{z}/{x}/{y}.png?taxon_id={id}&color={color}';
// Observations of the parent with the colored children excluded — the "everyone
// else" layer so capped-out taxa stay visible.
const REMAINDER_TILE_URL = 'https://api.inaturalist.org/v1/grid/{z}/{x}/{y}.png?taxon_id={id}&without_taxon_id={exclude}&color={color}';
const REMAINDER_COLOR = '#9aa0a6'; // pale grey: present but recessive under the colored taxa

// Per-child colors in OKLCH: fixed lightness/chroma, hue spread evenly around the
// wheel, so the set is perceptually uniform and every pair is equally separable.
const PALETTE_LIGHTNESS = 0.70;
const PALETTE_CHROMA = 0.15;
const PALETTE_START_HUE = 25; // warm orange-red for the most-observed child
// A large genus can have hundreds of children; past ~12 evenly-spaced hues stop
// being tellable apart, so we show the most-observed and page through the rest.
const MAX_CHILDREN = 12;

const AUTOCOMPLETE_DEBOUNCE_MS = 220;
const AUTOCOMPLETE_LIMIT = 8;
// When a legend row is hovered, its taxon jumps to near-opaque and the rest fade.
const HIGHLIGHT_OPACITY = 0.95;
const DIMMED_OPACITY = 0.1;
// A span this wide almost always means captive/errant outliers, not a real range,
// so we skip the fit rather than zoom out to nothing useful.
const MAX_FIT_LAT_SPAN = 130;
const MAX_FIT_LNG_SPAN = 220;

interface Entry {
  id: number;
  name: string;
  rank: string;
  common: string;
  photo: string | null;
  color: string;
  enabled: boolean;
  isParent: boolean;
  isRemainder: boolean;
  exclude: string; // remainder only: comma-joined ids to exclude
  layer: L.TileLayer | null;
}

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const taxonInput = byId<HTMLInputElement>('taxonInput');
const suggestionsEl = byId<HTMLUListElement>('suggestions');
const breadcrumbEl = byId('breadcrumb');
const taxonTitleEl = byId('taxonTitle');
const modeNoteEl = byId('modeNote');
const opacityVal = byId('opacityVal');
const legendEl = byId('legend');
const status = byId('status');

/** Terse `createElement` + assign props + append children. */
function el(tag: string, props: Record<string, unknown> = {}, ...children: (Node | string)[]) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

const setStatus = (msg: string) => { status.textContent = msg; };

// --- Palette (OKLCH → sRGB hex, Björn Ottosson's reference conversion) -------

function oklchToHex(lightness: number, chroma: number, hueDegrees: number): string {
  const hue = hueDegrees * Math.PI / 180;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);
  const l_ = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = lightness - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  return '#' + [lr, lg, lb].map(linearToHexChannel).join('');
}

function linearToHexChannel(value: number): string {
  const encoded = value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
  return Math.round(Math.min(1, Math.max(0, encoded)) * 255).toString(16).padStart(2, '0');
}

function generatePalette(count: number): string[] {
  const step = 360 / Math.max(count, 1);
  return Array.from({length: count}, (_, i) => oklchToHex(PALETTE_LIGHTNESS, PALETTE_CHROMA, PALETTE_START_HUE + i * step));
}

// --- Map setup --------------------------------------------------------------

const map = L.map('map', {worldCopyJump: true}).setView([15, -30], 3);

const esri = 'Tiles &copy; Esri';
const grayBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {maxZoom: 16, attribution: esri});
const grayLabels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {maxZoom: 16, attribution: ''});
const light = L.layerGroup([grayBase, grayLabels]);
const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {maxZoom: 19, attribution: esri});
const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {maxZoom: 18, attribution: esri});
light.addTo(map);
L.control.layers({Light: light, 'Street map': streets, Satellite: satellite}, undefined, {position: 'topleft'}).addTo(map);

// iNat overlays ride above the basemap; the grey remainder sits in a lower pane
// so the colored taxa always draw on top.
map.createPane('inatRemainderPane');
map.getPane('inatRemainderPane')!.style.zIndex = '390';
map.getPane('inatRemainderPane')!.style.pointerEvents = 'none';
map.createPane('inatPane');
map.getPane('inatPane')!.style.zIndex = '400';
map.getPane('inatPane')!.style.pointerEvents = 'none';

// --- State ------------------------------------------------------------------

let currentMode: 'observations' | 'range' = 'observations';
let overlayOpacity = 0.65;
let wildOnly = false;
let researchOnly = false;
let entries: Entry[] = [];
let currentTaxon: Taxon | null = null;
let childOffset = 0;

// --- Tile layers ------------------------------------------------------------

/** Extra observation-tile query params from the active filters (ranges ignore these). */
function observationFilterParams(): string {
  const params: string[] = [];
  if (researchOnly) params.push('quality_grade=research');
  if (wildOnly) params.push('captive=false');
  return params.length ? '&' + params.join('&') : '';
}

/** The tile URL for an entry, or null when it can't render in the current mode. */
function tileUrlFor(entry: Entry): string | null {
  const color = encodeURIComponent(entry.color);
  if (entry.isRemainder) {
    if (currentMode !== 'observations') return null; // ranges have no "everything-except" layer
    return REMAINDER_TILE_URL.replace('{id}', String(entry.id)).replace('{exclude}', entry.exclude).replace('{color}', color) + observationFilterParams();
  }
  if (currentMode === 'range') {
    return RANGE_TILE_URL.replace('{id}', String(entry.id)).replace('{color}', color);
  }
  return GRID_TILE_URL.replace('{id}', String(entry.id)).replace('{color}', color) + observationFilterParams();
}

function makeLayer(entry: Entry): L.TileLayer | null {
  const url = tileUrlFor(entry);
  if (!url) return null;
  return L.tileLayer(url, {
    pane: entry.isRemainder ? 'inatRemainderPane' : 'inatPane',
    opacity: overlayOpacity,
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.inaturalist.org">iNaturalist</a>',
  });
}

function addEntryLayer(entry: Entry) {
  if (entry.layer) return;
  const layer = makeLayer(entry);
  if (!layer) return;
  entry.layer = layer;
  layer.addTo(map);
}

function removeEntryLayer(entry: Entry) {
  if (!entry.layer) return;
  map.removeLayer(entry.layer);
  entry.layer = null;
}

/** Rebuild every enabled layer (used when mode/filters change). */
function refreshLayers() {
  for (const entry of entries) {
    removeEntryLayer(entry);
    if (entry.enabled) addEntryLayer(entry);
  }
}

// --- Entries / child windowing ----------------------------------------------

/** Active children, most-observed first, so rank 0 always gets the anchor color. */
function activeChildren(taxon: Taxon): Child[] {
  return taxon.children.filter(c => c.isActive).sort((a, b) => b.observationsCount - a.observationsCount);
}

function buildEntries(taxon: Taxon): {entries: Entry[]; totalActive: number; shownCount: number} {
  const parent: Entry = {
    id: taxon.id, name: taxon.name, rank: taxon.rank, common: taxon.common ?? '',
    photo: taxon.photo ?? null, color: '#555555', enabled: false, isParent: true, isRemainder: false, exclude: '', layer: null,
  };
  const sorted = activeChildren(taxon);
  const shown = sorted.slice(childOffset, childOffset + MAX_CHILDREN);
  const palette = generatePalette(shown.length);
  const children: Entry[] = shown.map((child, i) => ({
    id: child.id, name: child.name, rank: child.rank, common: child.common ?? '',
    photo: child.photo ?? null, color: palette[i]!, enabled: true, isParent: false, isRemainder: false, exclude: '', layer: null,
  }));

  const built = [parent, ...children];
  const remainderCount = sorted.length - shown.length;
  if (remainderCount > 0) {
    built.push({
      id: taxon.id, name: `Other ${remainderCount} taxa`, rank: 'remainder', common: '', photo: null,
      color: REMAINDER_COLOR, enabled: true, isParent: false, isRemainder: true,
      exclude: shown.map(c => c.id).join(','), layer: null,
    });
  }
  return {entries: built, totalActive: sorted.length, shownCount: shown.length};
}

/** Rebuild legend + overlays for the current taxon at the current child page. */
function applyChildWindow() {
  for (const entry of entries) removeEntryLayer(entry);
  if (!currentTaxon) return;
  const built = buildEntries(currentTaxon);
  entries = built.entries;
  if (built.totalActive === 0) {
    setStatus('This taxon has no child taxa — showing the taxon itself. Enable it in the legend.');
    entries[0]!.enabled = true;
  } else if (built.totalActive > built.shownCount || childOffset > 0) {
    setStatus(`Showing ${childOffset + 1}–${childOffset + built.shownCount} of ${built.totalActive} child taxa by observations.`);
  } else {
    setStatus(`${built.shownCount} child ${built.shownCount === 1 ? 'taxon' : 'taxa'} loaded.`);
  }
  renderLegend();
  refreshLayers();
}

function pageChildrenForward() {
  if (!currentTaxon) return;
  const total = activeChildren(currentTaxon).length;
  const next = childOffset + MAX_CHILDREN;
  childOffset = next >= total ? 0 : next;
  applyChildWindow();
}

function resetChildren() {
  childOffset = 0;
  applyChildWindow();
}

// --- Legend -----------------------------------------------------------------

function legendThumb(entry: Entry): HTMLElement {
  return entry.photo ? el('img', {className: 'legend-thumb', src: entry.photo, alt: ''}) : el('span', {className: 'legend-thumb'});
}

function legendName(entry: Entry): HTMLElement {
  if (entry.isRemainder) {
    return el('span', {className: 'legend-name'}, el('span', {className: 'sci', textContent: `${entry.name} (click to page through)`}));
  }
  const name = el('span', {className: 'legend-name'},
    el('span', {className: 'sci'}, el('em', {textContent: entry.name}), ` (${entry.isParent ? 'whole taxon' : entry.rank})`));
  if (entry.common) name.append(el('span', {className: 'common', textContent: entry.common}));
  return name;
}

function renderLegend() {
  legendEl.replaceChildren();
  entries.forEach((entry, index) => {
    if (entry.isRemainder && currentMode !== 'observations') return; // remainder is observation-only
    const drillable = !entry.isParent && !entry.isRemainder;
    const pageable = entry.isRemainder;

    const checkbox = el('input', {type: 'checkbox', checked: entry.enabled, title: 'Toggle layer'});
    checkbox.addEventListener('change', (e) => toggleEntry(index, (e.target as HTMLInputElement).checked));

    const swatch = el('span', {className: 'swatch', style: `background:${entry.color}`});

    let content: HTMLElement;
    if (drillable || pageable) {
      const button = el('button', {type: 'button', className: 'drill', title: drillable ? `View ${entry.name}` : 'Show the next taxa'}, legendThumb(entry), legendName(entry));
      button.addEventListener('click', () => (drillable ? loadTaxonById(entry.id) : pageChildrenForward()));
      content = button;
    } else {
      content = el('span', {className: 'nondrill'}, legendThumb(entry), legendName(entry));
    }

    const row = el('div', {className: entry.isParent ? 'legend-item parent' : 'legend-item'}, checkbox, swatch, content);
    row.addEventListener('mouseenter', () => highlightEntry(index));
    row.addEventListener('mouseleave', clearHighlight);
    legendEl.append(row);
  });

  if (childOffset > 0) {
    const reset = el('button', {type: 'button', className: 'drill pager-reset', textContent: '↩ Back to most-observed'});
    reset.addEventListener('click', resetChildren);
    legendEl.append(el('div', {className: 'legend-item'}, reset));
  }
}

function toggleEntry(index: number, checked: boolean) {
  const entry = entries[index]!;
  entry.enabled = checked;
  if (checked) addEntryLayer(entry); else removeEntryLayer(entry);
}

/** Emphasize one taxon (hovered row): bring it to front, fade the rest. */
function highlightEntry(index: number) {
  entries.forEach((entry, i) => entry.layer?.setOpacity(i === index ? HIGHLIGHT_OPACITY : DIMMED_OPACITY));
  entries[index]?.layer?.bringToFront();
}

function clearHighlight() {
  for (const entry of entries) entry.layer?.setOpacity(overlayOpacity);
}

// --- Breadcrumb + title -----------------------------------------------------

function renderBreadcrumb(taxon: Taxon) {
  breadcrumbEl.replaceChildren();
  if (!taxon.parent) return;
  const link = el('a', {textContent: taxon.parent.name, style: 'cursor:pointer'});
  const parentId = taxon.parent.id;
  link.addEventListener('click', () => loadTaxonById(parentId));
  breadcrumbEl.append('↑ ', link, ` (${taxon.parent.rank})`);
}

function renderTitle(taxon: Taxon) {
  const thumb = taxon.photo ? el('img', {className: 'legend-thumb', src: taxon.photo, alt: ''}) : el('span', {className: 'legend-thumb'});
  const label = el('span', {}, el('strong', {}, el('em', {textContent: taxon.name})), ` (${taxon.rank})`);
  if (taxon.common) label.append(` — ${taxon.common}`);
  taxonTitleEl.replaceChildren(thumb, label);
}

// --- Autocomplete -----------------------------------------------------------

let suggestionItems: Suggestion[] = [];
let activeSuggestion = -1;
let suggestionTimer: ReturnType<typeof setTimeout> | null = null;

function onSearchInput() {
  const text = taxonInput.value.trim();
  if (suggestionTimer) clearTimeout(suggestionTimer);
  if (!text || /^\d+$/.test(text) || /taxa\/\d+/.test(text)) { hideSuggestions(); return; }
  suggestionTimer = setTimeout(() => void fetchSuggestions(text), AUTOCOMPLETE_DEBOUNCE_MS);
}

async function fetchSuggestions(query: string) {
  try {
    const results = await searchTaxa(query, AUTOCOMPLETE_LIMIT);
    if (taxonInput.value.trim() !== query) return; // user kept typing; drop stale response
    renderSuggestions(results);
  } catch (err) {
    console.warn('autocomplete request failed', err);
  }
}

function suggestionRow(item: Suggestion, index: number): HTMLElement {
  const meta = `${item.rank}${item.observationsCount != null ? ` · ${item.observationsCount.toLocaleString()} obs` : ''}`;
  const li = el('li', {},
    item.photo ? el('img', {src: item.photo, alt: ''}) : el('img', {alt: ''}),
    el('span', {className: 's-text'},
      el('span', {className: 's-name'}, el('em', {textContent: item.name}), item.common ? ` — ${item.common}` : ''),
      el('span', {className: 's-meta', textContent: meta})));
  li.addEventListener('click', () => selectSuggestion(index));
  return li;
}

function renderSuggestions(items: Suggestion[]) {
  suggestionItems = items;
  activeSuggestion = -1;
  if (!items.length) { hideSuggestions(); return; }
  suggestionsEl.replaceChildren(...items.map(suggestionRow));
  suggestionsEl.hidden = false;
}

function hideSuggestions() {
  suggestionItems = [];
  activeSuggestion = -1;
  suggestionsEl.hidden = true;
  suggestionsEl.replaceChildren();
}

function selectSuggestion(index: number) {
  const item = suggestionItems[index];
  if (!item) return;
  taxonInput.value = item.name;
  hideSuggestions();
  void loadTaxonById(item.id);
}

function moveActiveSuggestion(delta: number) {
  const count = suggestionItems.length;
  if (!count) return;
  activeSuggestion = (activeSuggestion + delta + count) % count;
  [...suggestionsEl.children].forEach((li, i) => li.classList.toggle('active', i === activeSuggestion));
  suggestionsEl.children[activeSuggestion]?.scrollIntoView({block: 'nearest'});
}

function onSearchKeydown(event: KeyboardEvent) {
  const open = !suggestionsEl.hidden && suggestionItems.length > 0;
  if (open && event.key === 'ArrowDown') { event.preventDefault(); moveActiveSuggestion(1); }
  else if (open && event.key === 'ArrowUp') { event.preventDefault(); moveActiveSuggestion(-1); }
  else if (event.key === 'Enter') {
    event.preventDefault();
    if (open && activeSuggestion >= 0) selectSuggestion(activeSuggestion);
    else void loadFromInput();
  } else if (event.key === 'Escape') {
    hideSuggestions();
  }
}

// --- Load flow --------------------------------------------------------------

/** Reduce a bare id, a name, or any iNat taxa URL to {id} or {query}. */
function parseTaxonInput(raw: string): {id: number} | {query: string} | null {
  const text = raw.trim();
  if (!text) return null;
  const urlMatch = text.match(/taxa\/(\d+)/);
  if (urlMatch) return {id: parseInt(urlMatch[1]!, 10)};
  if (/^\d+$/.test(text)) return {id: parseInt(text, 10)};
  return {query: text};
}

async function loadTaxonById(id: number) {
  setStatus('Loading…');
  for (const entry of entries) removeEntryLayer(entry);
  entries = [];
  try {
    const taxon = await fetchTaxon(id);
    if (!taxon) { setStatus(`Could not load taxon ${id}.`); return; }
    currentTaxon = taxon;
    childOffset = 0;
    taxonInput.value = taxon.name;
    renderBreadcrumb(taxon);
    renderTitle(taxon);
    applyChildWindow();
    await fitToTaxon(id);
  } catch (err) {
    console.error(err);
    setStatus(`Error loading taxon: ${(err as Error).message}`);
  }
}

async function loadFromInput() {
  const parsed = parseTaxonInput(taxonInput.value);
  if (!parsed) { setStatus('Enter a taxon name, ID, or URL.'); return; }
  hideSuggestions();
  try {
    const id = 'id' in parsed ? parsed.id : (await searchTaxa(parsed.query, 1))[0]?.id;
    if (id == null) { setStatus('No taxon found for that search.'); return; }
    await loadTaxonById(id);
  } catch (err) {
    console.error(err);
    setStatus(`Error resolving taxon: ${(err as Error).message}`);
  }
}

/** Fit the map to where the taxon has observations (ignoring outlier-skewed bounds). */
async function fitToTaxon(id: number) {
  try {
    const b = await fetchBounds(id);
    if (!b) return;
    if (b.nelat - b.swlat > MAX_FIT_LAT_SPAN || b.nelng - b.swlng > MAX_FIT_LNG_SPAN) return;
    map.fitBounds([[b.swlat, b.swlng], [b.nelat, b.nelng]], {padding: [20, 20]});
  } catch (err) {
    console.warn('bounds lookup failed', err); // non-fatal
  }
}

// --- Controls ---------------------------------------------------------------

function setMode(mode: 'observations' | 'range') {
  currentMode = mode;
  modeNoteEl.textContent = mode === 'range'
    ? 'Range polygons exist mainly at species level. Children without a range on file (often subspecies) show nothing here — switch to Observations to see them.'
    : 'Observation grid, colored per child taxon. Denser cells = more observations. This mode reaches subspecies.';
  renderLegend();
  refreshLayers();
}

function setOpacity(value: number) {
  overlayOpacity = value / 100;
  opacityVal.textContent = String(value);
  for (const entry of entries) entry.layer?.setOpacity(overlayOpacity);
}

// --- Wiring -----------------------------------------------------------------

taxonInput.addEventListener('input', onSearchInput);
taxonInput.addEventListener('keydown', onSearchKeydown);
byId<HTMLButtonElement>('loadBtn').addEventListener('click', () => void loadFromInput());
for (const radio of document.querySelectorAll<HTMLInputElement>('input[name="mode"]')) {
  radio.addEventListener('change', () => setMode(radio.value as 'observations' | 'range'));
}
byId<HTMLInputElement>('wildOnly').addEventListener('change', (e) => { wildOnly = (e.target as HTMLInputElement).checked; refreshLayers(); });
byId<HTMLInputElement>('researchOnly').addEventListener('change', (e) => { researchOnly = (e.target as HTMLInputElement).checked; refreshLayers(); });
byId<HTMLInputElement>('opacity').addEventListener('input', (e) => setOpacity(Number((e.target as HTMLInputElement).value)));
// Close the dropdown when clicking outside the search box.
document.addEventListener('mousedown', (event) => {
  if (event.target === taxonInput || suggestionsEl.contains(event.target as Node)) return;
  hideSuggestions();
});

setMode(currentMode);
void loadFromInput();
