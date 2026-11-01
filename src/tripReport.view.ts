import type * as Leaflet from 'leaflet';
import {main} from './tripReport.ts';

// The Leaflet global comes from a CDN <script> in the page; type it without
// bundling so `L` stays a runtime global but is fully checked. (Same pattern as
// grid_viewer / range_viewer.)
declare const L: typeof import('leaflet');

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const form = byId<HTMLFormElement>('form');
const observer = byId<HTMLInputElement>('observer');
const dateInput = byId<HTMLInputElement>('date');
const loadBtn = byId<HTMLButtonElement>('loadBtn');
const status = byId('status');
const summaryEl = byId('summary');
const mapEl = byId('map');
const list = byId('list');

const GRADE_LABEL: Record<string, string> = {
  research: '✓ Research Grade',
  needs_id: 'Needs ID',
  casual: 'Casual',
};

let map: Leaflet.Map | null = null;
let layerGroup: Leaflet.LayerGroup | null = null;

// Default the picker to today (local time, not UTC, so the date matches the
// observer's calendar day). Also cap it at today — there are no future trips.
const today = _localDate(new Date());
dateInput.max = today;
if (!dateInput.value) dateInput.value = today;

/** `Date` → local-timezone YYYY-MM-DD. */
function _localDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Terse `createElement` + assign props + append children. */
function el(tag: string, props: Record<string, unknown> = {}, ...children: (Node | string)[]) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function renderSummary(summary: Awaited<ReturnType<typeof main>>['summary']) {
  summaryEl.replaceChildren(
    el('strong', {textContent: `${summary.total_observations} observations`}),
    ` · ${summary.unique_taxa} unique taxa · `,
    el('mark', {textContent: `★ ${summary.first_time_count} first-time sightings`}),
    ` · ${summary.research_grade_count} research grade`,
  );
}

function renderMap(rows: Awaited<ReturnType<typeof main>>['rows']) {
  const withCoords = rows.filter((r): r is typeof r & {coords: [number, number]} => r.coords != null);
  if (withCoords.length === 0) {
    mapEl.hidden = true;
    return;
  }
  mapEl.hidden = false;

  if (!map) {
    map = L.map(mapEl);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);
    layerGroup = L.layerGroup().addTo(map);
  }
  layerGroup!.clearLayers();

  // Connect non-obscured observations in chronological order.
  const pathPoints = [...withCoords]
    .filter(r => r.geoprivacy !== 'obscured' && r.taxon_geoprivacy !== 'obscured')
    .sort((a, b) => (a.time_observed_at ?? '').localeCompare(b.time_observed_at ?? ''))
    .map(r => r.coords);

  if (pathPoints.length > 1) {
    L.polyline(pathPoints, {color: '#2563eb', weight: 2, dashArray: '5, 6'}).addTo(layerGroup!);
  }

  for (const row of withCoords) {
    const name = row.taxon?.preferred_common_name || row.taxon?.name || 'Unknown';
    const marker = L.circleMarker(row.coords, {
      radius: row.is_first ? 8 : 6,
      color: row.is_first ? '#ca8a04' : '#1d4ed8',
      fillColor: row.is_first ? '#facc15' : '#60a5fa',
      fillOpacity: 0.9,
      weight: 2,
    });
    const popupNode = el('div', {},
      row.is_first ? el('strong', {textContent: '★ First time! '}) : '',
      el('a', {href: row.uri ?? '#', target: '_blank', rel: 'noopener', textContent: name}),
      el('br'),
      el('small', {
        textContent: row.observations_count != null
          ? `${row.observations_count.toLocaleString()} global obs`
          : 'Unidentified',
      }),
    );
    marker.bindPopup(popupNode).addTo(layerGroup!);
  }

  map.invalidateSize();
  map.fitBounds(L.latLngBounds(withCoords.map(r => r.coords)), {padding: [24, 24], maxZoom: 16});
}

function renderTable(rows: Awaited<ReturnType<typeof main>>['rows']) {
  list.replaceChildren(...rows.map((row, i) => {
    const taxon = row.taxon;
    const name = taxon?.preferred_common_name || taxon?.name || 'Unknown';
    const meta = [row.time_observed_at || row.observed_on, row.place_guess].filter(Boolean).join(' · ');
    return el('tr', {},
      el('td', {textContent: String(i + 1)}),
      el('td', {}, row.thumbnail_url ? el('img', {src: row.thumbnail_url, alt: '', loading: 'lazy'}) : ''),
      el('td', {},
        el('a', {href: row.uri ?? '#', target: '_blank', rel: 'noopener', textContent: name}),
        row.is_first ? ' ' : '',
        row.is_first ? el('mark', {textContent: '★ First time!'}) : '',
        el('br'),
        el('small', {}, el('i', {textContent: taxon?.name ?? ''})),
        el('br'),
        el('small', {textContent: meta}),
      ),
      el('td', {
        textContent: row.observations_count != null ? row.observations_count.toLocaleString() : '—',
      }),
      el('td', {textContent: GRADE_LABEL[row.quality_grade ?? ''] ?? 'Casual'}),
    );
  }));
}

async function load() {
  const userLogin = observer.value.trim();
  const observedOn = dateInput.value.trim();
  if (!userLogin || !observedOn) return;
  loadBtn.disabled = true;
  loadBtn.setAttribute('aria-busy', 'true');
  list.replaceChildren();
  summaryEl.replaceChildren();
  status.setAttribute('aria-busy', 'true'); // Pico renders a spinner beside the text
  status.textContent = 'Loading…';
  try {
    const {summary, rows} = await main(userLogin, observedOn, msg => {
      status.textContent = msg;
    });
    status.removeAttribute('aria-busy');
    renderSummary(summary);
    renderMap(rows);
    renderTable(rows);
    status.textContent = rows.length === 0 ? 'No observations on this date.' : '';
  } catch (err) {
    status.removeAttribute('aria-busy');
    status.textContent = `Error: ${(err as Error).message}`;
  } finally {
    loadBtn.disabled = false;
    loadBtn.removeAttribute('aria-busy');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  void load();
});

void load();
