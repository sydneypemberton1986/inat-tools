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
    // Scoped to .tree so only taxonomy nodes are rolled up.
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

export {};
