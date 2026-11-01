import type * as Leaflet from 'leaflet';
import {main, monthActivity, type MonthActivity} from './tripReport.ts';

// The Leaflet global comes from a CDN <script> in the page; type it without
// bundling so `L` stays a runtime global but is fully checked. (Same pattern as
// grid_viewer / range_viewer.)
declare const L: typeof import('leaflet');

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const form = byId<HTMLFormElement>('form');
const observer = byId<HTMLInputElement>('observer');
const loadBtn = byId<HTMLButtonElement>('loadBtn');
const status = byId('status');
const summaryEl = byId('summary');
const mapEl = byId('map');
const list = byId('list');
const calMonthLabel = byId('calMonth');
const calGrid = byId('calGrid');
const prevMonthBtn = byId<HTMLButtonElement>('prevMonth');
const nextMonthBtn = byId<HTMLButtonElement>('nextMonth');

const GRADE_LABEL: Record<string, string> = {
  research: '✓ Research Grade',
  needs_id: 'Needs ID',
  casual: 'Casual',
};

let map: Leaflet.Map | null = null;
let layerGroup: Leaflet.LayerGroup | null = null;

// --- Custom calendar date picker -------------------------------------------
// Native <input type="date"> can't colour individual days, so we roll our own.
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const todayStr = _localDate(new Date());
let selectedDate = todayStr;          // the day whose report is shown
let [viewYear, viewMonth] = _ym(todayStr); // month currently on the calendar (viewMonth 1-12)
/** Per-(observer, month) activity, so re-visiting a month is instant. */
const activityCache = new Map<string, MonthActivity>();

/** `Date` → local-timezone YYYY-MM-DD (so the day matches the viewer's calendar). */
function _localDate(d: Date): string {
  return `${d.getFullYear()}-${_pad(d.getMonth() + 1)}-${_pad(d.getDate())}`;
}
function _pad(n: number): string { return String(n).padStart(2, '0'); }
function _ym(dateStr: string): [number, number] {
  const [y, m] = dateStr.split('-').map(Number);
  return [y, m];
}
function _monthKey(login: string, y: number, m: number): string { return `${login}:${y}-${_pad(m)}`; }

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

/** Draw the month grid from cached activity (instant); colours fill in once
 *  `refreshMonth` has fetched them. */
function renderCalendar() {
  calMonthLabel.textContent = `${MONTH_NAMES[viewMonth - 1]} ${viewYear}`;
  const [curYear, curMonth] = _ym(todayStr);
  nextMonthBtn.disabled = viewYear > curYear || (viewYear === curYear && viewMonth >= curMonth);

  const activity = activityCache.get(_monthKey(observer.value.trim(), viewYear, viewMonth));
  const cells: (Node | string)[] = WEEKDAYS.map(w => el('div', {className: 'cal-head', textContent: w}));

  // Blank leading cells so day 1 lands under the right weekday.
  const firstDow = new Date(viewYear, viewMonth - 1, 1).getDay();
  for (let i = 0; i < firstDow; i++) cells.push(el('div', {className: 'cal-pad'}));

  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${viewYear}-${_pad(viewMonth)}-${_pad(d)}`;
    let cls = 'cal-day';
    if (activity?.lifers.has(dateStr)) cls += ' lifer';
    else if (activity?.observed.has(dateStr)) cls += ' obs';
    if (dateStr === selectedDate) cls += ' selected';
    const cell = el('button', {className: cls, type: 'button', textContent: String(d), disabled: dateStr > todayStr});
    cell.dataset.date = dateStr;
    cells.push(cell);
  }
  calGrid.replaceChildren(...cells);
}

/** Fetch (once) and colour the month currently on screen. */
async function refreshMonth() {
  const login = observer.value.trim();
  if (!login) return;
  const key = _monthKey(login, viewYear, viewMonth);
  if (activityCache.has(key)) { renderCalendar(); return; }
  calGrid.setAttribute('aria-busy', 'true');
  try {
    activityCache.set(key, await monthActivity(login, viewYear, viewMonth));
  } catch {
    // Leave the month uncoloured; clicking a day still loads its report.
  } finally {
    calGrid.removeAttribute('aria-busy');
  }
  renderCalendar();
}

/** Render the current month immediately, then fill in its colours. */
function showMonth() {
  renderCalendar();
  void refreshMonth();
}

function stepMonth(delta: number) {
  const d = new Date(viewYear, viewMonth - 1 + delta, 1);
  viewYear = d.getFullYear();
  viewMonth = d.getMonth() + 1;
  showMonth();
}

prevMonthBtn.addEventListener('click', () => stepMonth(-1));
nextMonthBtn.addEventListener('click', () => stepMonth(1));

calGrid.addEventListener('click', event => {
  const btn = (event.target as HTMLElement).closest('.cal-day') as HTMLButtonElement | null;
  if (!btn || btn.disabled || !btn.dataset.date) return;
  selectedDate = btn.dataset.date;
  renderCalendar(); // move the selection outline
  void load();
});

async function load() {
  const userLogin = observer.value.trim();
  const observedOn = selectedDate;
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
  showMonth(); // re-fetch the visible month for the (possibly changed) observer
  void load();
});

showMonth();
void load();
