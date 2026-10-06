// Missed common things: the species most reported within 100 km of where the
// viewer is right now that they have NOT recorded — what's active locally this
// month that's still missing from their life list.
//
// Standalone client page. The observer is typed in (not baked at build time).
// Everything comes straight from the iNaturalist API when the button is pressed:
// the in-season local species per group, and — scoped to just the ~10 species
// shown per group — which of them the observer still needs. The browser
// geolocation is sent only to iNaturalist, never stored.

const COUNTS_API = 'https://api.inaturalist.org/v1/observations/species_counts';
const RADIUS_KM = 100;
const PER_GROUP = 10;      // species listed per group

// Seasonality comes from the viewer's current month: filtering species_counts to
// this month lists what is actually being seen locally right now.
const MONTH = new Date().getMonth() + 1;
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_NAME = MONTH_NAMES[MONTH - 1];
// A season-neutral species holds ~1/12 (8.3%) of its yearly local sightings in
// any one month; well above that means it clusters in this season — a "go now"
// target rather than a year-round resident.
const IN_SEASON_SHARE = 0.15;
// iNat iconic-taxon buckets paired with a plain-language label, in display order.
const GROUPS: [string, string][] = [
  ['Aves', 'Birds'], ['Mammalia', 'Mammals'], ['Reptilia', 'Reptiles'],
  ['Amphibia', 'Amphibians'], ['Actinopterygii', 'Fishes'], ['Mollusca', 'Mollusks'],
  ['Arachnida', 'Arachnids'], ['Insecta', 'Insects'], ['Plantae', 'Plants'],
  ['Fungi', 'Fungi & Lichens'],
];

function setStatus(msg: string): void { document.getElementById('status')!.textContent = msg; }

// Escape via the DOM so a common name with an angle bracket can't inject markup.
function esc(value: unknown): string {
  const div = document.createElement('div');
  div.textContent = value == null ? '' : String(value);
  return div.innerHTML;
}

// total_results for a species_counts query; per_page=0 asks for the count only.
async function countAt(query: string): Promise<number> {
  const response = await fetch(COUNTS_API + '?' + query + '&rank=species&per_page=0');
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return (await response.json()).total_results || 0;
}

// The species most reported locally in the current month, for one iconic group.
async function topThisMonth(lat: number, lng: number, iconic: string): Promise<any[]> {
  const query = 'lat=' + lat + '&lng=' + lng + '&radius=' + RADIUS_KM
    + '&iconic_taxa=' + iconic + '&rank=species&per_page=' + PER_GROUP + '&month=' + MONTH;
  const response = await fetch(COUNTS_API + '?' + query);
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return (await response.json()).results || [];
}

// All-year local totals for specific taxa in one call, so each species' current-
// month share (this month ÷ all year) shows how seasonal it is here.
async function totalsFor(lat: number, lng: number, ids: any[]): Promise<Record<string, any>> {
  if (!ids.length) return {};
  const query = 'lat=' + lat + '&lng=' + lng + '&radius=' + RADIUS_KM
    + '&taxon_id=' + ids.join(',') + '&rank=species&per_page=' + ids.length;
  const response = await fetch(COUNTS_API + '?' + query);
  if (!response.ok) throw new Error('HTTP ' + response.status);
  const totals: Record<string, any> = {};
  for (const row of (await response.json()).results || []) totals[row.taxon.id] = row.count;
  return totals;
}

// Which of the given taxa the observer has NOT recorded. iNat's
// unobserved_by_user_id filter answers this for just the ~10 ids on screen, so
// there's no need to pull the observer's whole life list to mark ✓ vs ○.
async function missingFor(ids: any[], user: string): Promise<Set<number>> {
  if (!ids.length) return new Set();
  const query = 'taxon_id=' + ids.join(',') + '&unobserved_by_user_id=' + encodeURIComponent(user)
    + '&rank=species&per_page=' + ids.length;
  const response = await fetch(COUNTS_API + '?' + query);
  if (!response.ok) throw new Error('HTTP ' + response.status);
  const missing = new Set<number>();
  for (const row of (await response.json()).results || []) missing.add(row.taxon.id);
  return missing;
}

function itemHTML(row: any, share: number | null, missing: Set<number>): string {
  const taxon = row.taxon || {};
  const id = taxon.id;
  const have = !missing.has(id);
  const href = 'https://www.inaturalist.org/taxa/' + id;
  const common = esc(taxon.preferred_common_name || taxon.name || '?');
  const sci = esc(taxon.name || '');
  const photo = (taxon.default_photo || {}).square_url;
  const mark = have ? '✓' : '○';
  const thumb = photo ? '<img src="' + esc(photo) + '" alt="" loading="lazy">' : '';
  // A high current-month share is the "in season, go now" signal; year-round
  // species are left unadorned.
  const season = (share != null && share >= IN_SEASON_SHARE)
    ? '<span class="bs-season">' + Math.round(share * 100) + '% in ' + MONTH_NAME + '</span>' : '';
  const seen = row.count ? '<span class="bs-count">' + row.count.toLocaleString() + '× here</span>' : '';
  const meta = (season || seen) ? '<span class="bs-meta">' + season + seen + '</span>' : '';
  return '<li class="bs-item' + (have ? ' bs-item-have' : '') + '">'
    + '<span class="bs-mark" title="' + (have ? 'on your life list' : 'not recorded yet') + '">' + mark + '</span>'
    + '<a class="bs-link" href="' + href + '" target="_blank" rel="noopener">'
    + thumb + '<span class="bs-name">' + common + '</span></a>'
    + '<span class="bs-sci">' + sci + '</span>' + meta + '</li>';
}

async function load(lat: number, lng: number, user: string): Promise<void> {
  const results = document.getElementById('bs-results')!;
  results.innerHTML = '';

  // Coverage line: how many of the area's species (all year) you've recorded.
  try {
    const base = 'lat=' + lat + '&lng=' + lng + '&radius=' + RADIUS_KM;
    const [total, unseen] = await Promise.all([
      countAt(base),
      countAt(base + '&unobserved_by_user_id=' + encodeURIComponent(user)),
    ]);
    const have = total - unseen;
    setStatus(have.toLocaleString() + ' of ' + total.toLocaleString()
      + ' species within ' + RADIUS_KM + ' km on your list · showing what’s out in ' + MONTH_NAME);
  } catch {
    setStatus('');
  }

  // One block per group: this month's top species, then — for just those ids — a
  // season-share call and an "unobserved by this user" call, in parallel. Groups
  // run concurrently. No per-observer life-list fetch anywhere.
  const groups = await Promise.all(GROUPS.map(async ([iconic, label]) => {
    try {
      const rows = await topThisMonth(lat, lng, iconic);
      const ids = rows.map((row) => row.taxon.id);
      const [totals, missing] = await Promise.all([totalsFor(lat, lng, ids), missingFor(ids, user)]);
      return [label, rows, totals, missing] as [string, any[], Record<string, any>, Set<number>];
    } catch {
      return [label, [], {}, new Set<number>()] as [string, any[], Record<string, any>, Set<number>];
    }
  }));
  const html: string[] = [];
  for (const [label, rows, totals, missing] of groups) {
    if (!rows.length) continue;
    html.push('<div class="bs-group"><h3>' + esc(label) + '</h3><ul class="bs-list">');
    for (const row of rows) {
      const total = totals[row.taxon.id];
      html.push(itemHTML(row, total ? row.count / total : null, missing));
    }
    html.push('</ul></div>');
  }
  results.innerHTML = html.join('') || '<p>No species found near this location.</p>';
}

// Button handler: geolocate, then load for whatever observer is in the input.
function run(): void {
  const username = (document.getElementById('observer') as HTMLInputElement).value.trim();
  if (!username) return;
  if (!navigator.geolocation) { setStatus('This browser can’t share a location.'); return; }
  const button = document.getElementById('locateBtn') as HTMLButtonElement;
  button.disabled = true;
  setStatus('Waiting for your location…');
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        setStatus('Finding what’s active near you in ' + MONTH_NAME + '…');
        await load(pos.coords.latitude, pos.coords.longitude, username);
      } catch (err) {
        setStatus('Error: ' + (err as Error).message);
      } finally {
        button.disabled = false;
      }
    },
    (err) => { button.disabled = false; setStatus('Couldn’t get your location: ' + err.message); },
    { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 },
  );
}

// The button uses an inline onclick; module scope isn't global, so re-expose it.
(window as any).runBlindSpots = run;

export {};
