import {main, type Species, type Trending} from './trending.ts';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const form = byId<HTMLFormElement>('form');
const observer = byId<HTMLInputElement>('observer');
const locateBtn = byId<HTMLButtonElement>('locateBtn');
const status = byId('status');
const results = byId('results');

const RADIUS_KM = 100;
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
/** A season-neutral species holds ~1/12 (8.3%) of its yearly local sightings in
 *  any month; well above that means it clusters now — a "go now" target. */
const IN_SEASON_SHARE = 0.15;

const taxonUrl = (id: number) => `https://www.inaturalist.org/taxa/${id}`;

/** Terse `createElement` + assign props + append children. */
function el(tag: string, props: Record<string, unknown> = {}, ...children: (Node | string)[]) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function speciesItem(sp: Species, monthName: string): HTMLElement {
  const link = el('a', {className: 'bs-link', href: taxonUrl(sp.id), target: '_blank', rel: 'noopener'});
  if (sp.photo) link.append(el('img', {src: sp.photo, alt: '', loading: 'lazy'}));
  link.append(el('span', {className: 'bs-name', textContent: sp.common || sp.name || '?'}));

  const meta = el('span', {className: 'bs-meta'});
  if (sp.share != null && sp.share >= IN_SEASON_SHARE) {
    meta.append(el('span', {className: 'bs-season', textContent: `${Math.round(sp.share * 100)}% in ${monthName}`}));
  }
  if (sp.count) meta.append(el('span', {className: 'bs-count', textContent: `${sp.count.toLocaleString()}× here`}));

  return el('li', {className: sp.missing ? 'bs-item' : 'bs-item bs-item-have'},
    el('span', {className: 'bs-mark', title: sp.missing ? 'not recorded yet' : 'on your life list', textContent: sp.missing ? '○' : '✓'}),
    link,
    el('span', {className: 'bs-sci', textContent: sp.name}),
    meta);
}

function render(data: Trending) {
  const monthName = MONTH_NAMES[data.month - 1]!;
  if (!data.groups.length) {
    results.replaceChildren(el('p', {textContent: 'No species found near this location.'}));
    return;
  }
  results.replaceChildren(...data.groups.map(group =>
    el('div', {className: 'bs-group'},
      el('h3', {textContent: group.label}),
      el('ul', {className: 'bs-list'}, ...group.species.map(sp => speciesItem(sp, monthName))))));
}

function coverageLine(data: Trending): string {
  const monthName = MONTH_NAMES[data.month - 1]!;
  if (!data.coverage) return `Showing what's out in ${monthName}`;
  const {have, total} = data.coverage;
  return `${have.toLocaleString()} of ${total.toLocaleString()} species within ${RADIUS_KM} km on your list · showing what's out in ${monthName}`;
}

/** Geolocate, then load what's active near the viewer for the typed-in observer. */
function run() {
  const user = observer.value.trim();
  if (!user) return;
  if (!navigator.geolocation) {
    status.textContent = "This browser can't share a location.";
    return;
  }
  locateBtn.disabled = true;
  status.textContent = 'Waiting for your location…';
  navigator.geolocation.getCurrentPosition(
    async ({coords}) => {
      try {
        status.textContent = 'Finding what’s active near you…';
        const data = await main(user, coords.latitude, coords.longitude);
        render(data);
        status.textContent = coverageLine(data);
      } catch (err) {
        status.textContent = `Error: ${(err as Error).message}`;
      } finally {
        locateBtn.disabled = false;
      }
    },
    (err) => {
      locateBtn.disabled = false;
      status.textContent = `Couldn't get your location: ${err.message}`;
    },
    {enableHighAccuracy: false, timeout: 15000, maximumAge: 600000},
  );
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  run();
});
