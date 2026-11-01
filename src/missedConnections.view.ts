import {main, type Missed, type MissedConnections} from './missedConnections.ts';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const form = byId<HTMLFormElement>('form');
const observer = byId<HTMLInputElement>('observer');
const radiusSel = byId<HTMLSelectElement>('radius');
const locateBtn = byId<HTMLButtonElement>('locateBtn');
const status = byId('status');
const results = byId('results');

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const taxonUrl = (id: number) => `https://www.inaturalist.org/taxa/${id}`;

/** Terse `createElement` + assign props + append children. */
function el(tag: string, props: Record<string, unknown> = {}, ...children: (Node | string)[]) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

/** Common name cased like iNat's taxon pages ("tall gramma" → "Tall Gramma"),
 *  else the scientific name. Only word-initial letters change. */
function commonName(sp: Missed): string {
  if (sp.common) return sp.common.replace(/(^|\s)(\p{L})/gu, (_m, pre, ch) => pre + ch.toUpperCase());
  return sp.name || '?';
}

function speciesItem(sp: Missed, i: number): HTMLElement {
  const link = el('a', {className: 'mc-link', href: taxonUrl(sp.id), target: '_blank', rel: 'noopener'});
  if (sp.photo) link.append(el('img', {src: sp.photo, alt: '', loading: 'lazy'}));
  link.append(el('span', {className: 'mc-name', textContent: commonName(sp)}));

  return el('li', {className: 'mc-item'},
    el('span', {className: 'mc-rank', textContent: String(i + 1)}),
    link,
    el('span', {className: 'mc-sci', textContent: sp.name}),
    el('span', {className: 'mc-meta', textContent: `${sp.count.toLocaleString()}× nearby`}));
}

function render(data: MissedConnections) {
  if (!data.species.length) {
    results.replaceChildren(el('p', {textContent: 'No missed connections nearby — try a bigger radius.'}));
    return;
  }
  results.replaceChildren(
    el('ol', {className: 'mc-list'}, ...data.species.map((sp, i) => speciesItem(sp, i))),
  );
}

function summaryLine(data: MissedConnections): string {
  const monthName = MONTH_NAMES[data.month - 1]!;
  return `${data.species.length} species seen within ${data.radiusKm} km this ${monthName} that you’ve never logged — go introduce yourself.`;
}

/** Geolocate, then load the top missed species within the chosen radius. */
function run() {
  const user = observer.value.trim();
  if (!user) return;
  if (!navigator.geolocation) {
    status.textContent = "This browser can't share a location.";
    return;
  }
  const radiusKm = Number(radiusSel.value);
  locateBtn.disabled = true;
  results.replaceChildren();
  status.textContent = 'Waiting for your location…';
  navigator.geolocation.getCurrentPosition(
    async ({coords}) => {
      try {
        status.setAttribute('aria-busy', 'true');
        status.textContent = 'Finding who you keep missing…';
        const data = await main(user, coords.latitude, coords.longitude, radiusKm);
        status.removeAttribute('aria-busy');
        render(data);
        status.textContent = summaryLine(data);
      } catch (err) {
        status.removeAttribute('aria-busy');
        status.textContent = `Error: ${(err as Error).message}`;
      } finally {
        locateBtn.disabled = false;
      }
    },
    (err) => {
      locateBtn.disabled = false;
      status.textContent = `Couldn't get your location: ${err.message}`;
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 300000},
  );
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  run();
});
