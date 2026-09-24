(function () {
  const ids = ['f-region', 'f-establishment', 'f-captive', 'f-coarse'];
  const controls = ids.map((id) => document.getElementById(id)) as HTMLSelectElement[];
  // The filter bar only exists on the tree page; bail out cleanly elsewhere.
  if (controls.some((c) => !c)) return;
  const [region, establishment, captive, coarse] = controls;
  const count = document.getElementById('match-count')!;
  const reset = document.getElementById('f-reset')!;

  function matches(o: HTMLElement): boolean {
    if (region.value && o.dataset.region !== region.value) return false;
    if (establishment.value && o.dataset.establishment !== establishment.value) return false;
    if (captive.value && o.dataset.captive !== captive.value) return false;
    if (coarse.value && o.dataset.coarse !== coarse.value) return false;
    return true;
  }

  function apply() {
    const active = controls.some((c) => c.value);
    let visible = 0;
    document.querySelectorAll<HTMLElement>('.obs').forEach((o) => {
      const show = matches(o);
      o.classList.toggle('filtered', !show);
      if (show) visible += 1;
    });
    // Roll up: a taxon stays only while it still holds a visible observation.
    // Scoped to the tree so the separate blind-spots panel is never touched.
    document.querySelectorAll<HTMLDetailsElement>('.tree details').forEach((d) => {
      const has = d.querySelector('.obs:not(.filtered)') !== null;
      d.classList.toggle('filtered', active && !has);
      if (active && has) d.open = true;
    });
    // Leaf taxa carry no observations, so nothing to match once a filter is on.
    document.querySelectorAll<HTMLElement>('.leaf').forEach((l) => l.classList.toggle('filtered', active));
    count.textContent = active ? visible + ' matching observations' : '';
  }

  controls.forEach((c) => c.addEventListener('change', apply));
  reset.addEventListener('click', () => {
    controls.forEach((c) => { c.value = ''; });
    apply();
  });
  apply();
})();

// Blind spots: the species most observed within 100 km of where the viewer is
// right now that they have not recorded. The circle is centered on the browser's
// geolocation, so the whole panel is filled in live from the iNaturalist API when
// the button is pressed; nothing here is server-rendered.
(function () {
  const root = document.getElementById('blind-spots') as HTMLDetailsElement | null;
  if (!root) return;
  const config = JSON.parse(document.getElementById('bs-data')!.textContent!);
  const observed = new Set(config.observed || []);
  const user = config.user;
  const button = document.getElementById('bs-locate') as HTMLButtonElement;
  const status = document.getElementById('bs-status')!;
  const results = document.getElementById('bs-results')!;

  const RADIUS_KM = 100;
  const PER_GROUP = 10;
  // Seasonality comes from the viewer's current month. iNat's month_of_year
  // histogram is just observation counts split by calendar month, so filtering
  // species_counts to this month lists what is actually being seen locally now.
  const MONTH = new Date().getMonth() + 1;
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const MONTH_NAME = MONTH_NAMES[MONTH - 1];
  // A season-neutral species holds ~1/12 (8.3%) of its yearly local sightings in
  // any one month; well above that means it clusters in this season — a target
  // worth chasing now rather than a resident you can find any time.
  const IN_SEASON_SHARE = 0.15;
  const API = 'https://api.inaturalist.org/v1/observations/species_counts';
  // iNat's iconic-taxon buckets paired with a plain-language label, in display
  // order. Mirrors the set the tree uses; the noise tiers are intentionally left off.
  const GROUPS = [
    ['Aves', 'Birds'], ['Mammalia', 'Mammals'], ['Reptilia', 'Reptiles'],
    ['Amphibia', 'Amphibians'], ['Actinopterygii', 'Fishes'], ['Mollusca', 'Mollusks'],
    ['Arachnida', 'Arachnids'], ['Insecta', 'Insects'], ['Plantae', 'Plants'],
    ['Fungi', 'Fungi & Lichens'],
  ];

  // Escape via the DOM so a common name with an angle bracket can't inject markup.
  function esc(value: unknown): string {
    const div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
  }

  // total_results for a species_counts query; per_page=0 asks for the count only.
  async function countAt(query: string): Promise<number> {
    const response = await fetch(API + '?' + query + '&rank=species&per_page=0');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return (await response.json()).total_results || 0;
  }

  // The species most reported locally in the current month, per group. Recorded
  // and missing are both listed; the mark tells them apart. Each row's count is
  // this month's local tally.
  async function topThisMonth(lat: number, lng: number, iconic: string): Promise<any[]> {
    const query = 'lat=' + lat + '&lng=' + lng + '&radius=' + RADIUS_KM
      + '&iconic_taxa=' + iconic + '&rank=species&per_page=' + PER_GROUP
      + '&month=' + MONTH;
    const response = await fetch(API + '?' + query);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return (await response.json()).results || [];
  }

  // All-year local totals for specific taxa, in one call, so each species'
  // current-month share (this month ÷ all year) shows how seasonal it is here.
  async function totalsFor(lat: number, lng: number, ids: any[]): Promise<Record<string, any>> {
    if (!ids.length) return {};
    const query = 'lat=' + lat + '&lng=' + lng + '&radius=' + RADIUS_KM
      + '&taxon_id=' + ids.join(',') + '&rank=species&per_page=' + ids.length;
    const response = await fetch(API + '?' + query);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const totals: Record<string, any> = {};
    for (const row of (await response.json()).results || []) totals[row.taxon.id] = row.count;
    return totals;
  }

  function itemHTML(row: any, share: number | null): string {
    const taxon = row.taxon || {};
    const id = taxon.id;
    const have = observed.has(id);
    const href = 'https://www.inaturalist.org/taxa/' + id;
    const common = esc(taxon.preferred_common_name || taxon.name || '?');
    const sci = esc(taxon.name || '');
    const photo = (taxon.default_photo || {}).square_url;
    const mark = have
      ? '<span class="bs-mark bs-have" title="on your life list">✓</span>'
      : '<span class="bs-mark bs-missing" title="not recorded yet">○</span>';
    const thumb = photo
      ? '<img class="bs-thumb" src="' + esc(photo) + '" alt="" loading="lazy">'
      : '';
    // How concentrated this species is in the current month here; a high share is
    // the "in season, go now" signal, a season-neutral one is left unadorned.
    const season = (share != null)
      ? '<span class="bs-season' + (share >= IN_SEASON_SHARE ? ' bs-season-hot' : '')
        + '" title="share of this species’ yearly local sightings that fall in '
        + MONTH_NAME + '">' + Math.round(share * 100) + '% in ' + MONTH_NAME + '</span>'
      : '';
    const seen = row.count
      ? '<span class="bs-count">seen ' + row.count.toLocaleString() + '× here in '
        + MONTH_NAME + '</span>'
      : '';
    return '<li class="bs-item' + (have ? ' bs-item-have' : '') + '">' + mark
      + '<a class="bs-link" href="' + href + '" target="_blank" rel="noopener">'
      + thumb + '<span class="bs-name">' + common + '</span></a>'
      + '<span class="bs-sci">' + sci + '</span>' + season + seen + '</li>';
  }

  async function load(lat: number, lng: number) {
    status.textContent = 'Finding what’s active near you in ' + MONTH_NAME + '…';
    results.innerHTML = '';

    // Coverage line: how many of the area's species (all year) you've recorded.
    try {
      const base = 'lat=' + lat + '&lng=' + lng + '&radius=' + RADIUS_KM;
      const [total, missing] = await Promise.all([
        countAt(base),
        countAt(base + '&unobserved_by_user_id=' + encodeURIComponent(user)),
      ]);
      const have = total - missing;
      status.textContent = have.toLocaleString() + ' of ' + total.toLocaleString()
        + ' species within ' + RADIUS_KM + ' km on your list · showing what’s out in '
        + MONTH_NAME;
    } catch (err) {
      status.textContent = '';
    }

    // One block per group: this month's top species, then a single all-year call
    // to tag each with its current-month seasonal share. Groups run in parallel.
    const groups = await Promise.all(GROUPS.map(async (pair) => {
      try {
        const rows = await topThisMonth(lat, lng, pair[0]);
        const totals = await totalsFor(lat, lng, rows.map((row) => row.taxon.id));
        return [pair[1], rows, totals] as [string, any[], Record<string, any>];
      } catch (err) {
        return [pair[1], [], {}] as [string, any[], Record<string, any>];
      }
    }));
    const html: string[] = [];
    for (const [label, rows, totals] of groups) {
      if (!rows.length) continue;
      html.push('<div class="bs-group"><h3>' + esc(label) + '</h3><ul class="bs-list">');
      for (const row of rows) {
        const total = totals[row.taxon.id];
        html.push(itemHTML(row, total ? row.count / total : null));
      }
      html.push('</ul></div>');
    }
    results.innerHTML = html.join('')
      || '<p class="bs-status">No species found near this location.</p>';
  }

  button.addEventListener('click', () => {
    if (!navigator.geolocation) {
      status.textContent = 'This browser can’t share a location.';
      return;
    }
    root.open = true;
    button.disabled = true;
    status.textContent = 'Waiting for your location…';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        button.disabled = false;
        load(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        button.disabled = false;
        status.textContent = 'Couldn’t get your location: ' + err.message;
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 }
    );
  });
})();

export {};
