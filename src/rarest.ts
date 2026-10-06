const COUNTS_API = 'https://api.inaturalist.org/v1/observations/species_counts';
const OBS_API = 'https://api.inaturalist.org/v1/observations';
const PER_PAGE = 500;      // species_counts page size
const OBS_PER_PAGE = 200;  // observations page size (API max)
const ID_CHUNK = 100;      // taxon ids per observations request (keeps URLs short)

function setStatus(msg: string): void { document.getElementById('status')!.innerText = msg; }
function esc(s: unknown): string {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as Record<string, string>
    )[c]);
}

// Pull every species_counts page for the user. Each result carries the
// user's `count` and `taxon.observations_count` (the global total we rank on).
async function fetchTaxa(username: string): Promise<any[]> {
    const results: any[] = [];
    let page = 1;
    let total = Infinity;
    while (results.length < total) {
        const url = `${COUNTS_API}?user_login=${encodeURIComponent(username)}&per_page=${PER_PAGE}&page=${page}`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`iNat API returned ${resp.status}`);
        const data = await resp.json();
        total = data.total_results;
        results.push(...data.results);
        setStatus(`Ranking taxa… ${results.length} of ${total}`);
        if (!data.results.length) break;
        page += 1;
    }
    return results;
}

// species_counts has no observation ids or validation status, so fetch the
// user's actual observations for the ranked taxa. Batched by taxon id to keep
// URLs short; each returned observation is tagged with its taxon's global
// rarity so the whole list can be ranked together.
async function fetchObservations(username: string, taxa: any[]): Promise<any[]> {
    const byTaxon: Record<number, any> = {};
    for (const item of taxa) byTaxon[item.taxon.id] = item.taxon;
    const ids = taxa.map((t) => t.taxon.id);
    const rows: any[] = [];
    for (let i = 0; i < ids.length; i += ID_CHUNK) {
        const chunk = ids.slice(i, i + ID_CHUNK);
        let page = 1;
        let total = Infinity;
        let got = 0;
        while (got < total) {
            const url = `${OBS_API}?user_login=${encodeURIComponent(username)}`
                + `&taxon_id=${chunk.join(',')}&per_page=${OBS_PER_PAGE}&page=${page}`
                + `&order_by=observed_on&order=desc`;
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(`iNat API returned ${resp.status}`);
            const data = await resp.json();
            total = data.total_results;
            for (const obs of data.results) {
                const taxon = byTaxon[obs.taxon?.id];
                if (!taxon) continue;
                rows.push({ obs, taxon, global: taxon.observations_count });
            }
            got += data.results.length;
            setStatus(`Loading observations… ${rows.length}`);
            if (!data.results.length) break;
            page += 1;
        }
    }
    return rows;
}

async function loadRarest(): Promise<void> {
    const username = (document.getElementById('observer') as HTMLInputElement).value.trim();
    const limit = parseInt((document.getElementById('limit') as HTMLInputElement).value, 10);
    const list = document.getElementById('list')!;
    const btn = document.getElementById('loadBtn') as HTMLButtonElement;
    if (!username) return;

    btn.disabled = true;
    list.innerHTML = '';
    setStatus('Loading…');
    try {
        const taxa = await fetchTaxa(username);
        // Rarest first: fewest global observations. Ties broken by name.
        taxa.sort((a, b) => {
            const ga = a.taxon?.observations_count ?? Infinity;
            const gb = b.taxon?.observations_count ?? Infinity;
            if (ga !== gb) return ga - gb;
            return (a.taxon?.name || '').localeCompare(b.taxon?.name || '');
        });
        const topTaxa = limit > 0 ? taxa.slice(0, limit) : taxa;

        const rows = await fetchObservations(username, topTaxa);
        // Rank the observations by their taxon's global rarity; within a taxon,
        // most recent first.
        rows.sort((a, b) => {
            if (a.global !== b.global) return a.global - b.global;
            const n = (a.taxon.name || '').localeCompare(b.taxon.name || '');
            if (n) return n;
            return (b.obs.observed_on || '').localeCompare(a.obs.observed_on || '');
        });
        render(rows);
        setStatus(`${rows.length} observations across ${topTaxa.length} rarest taxa`);
    } catch (err) {
        setStatus('Error: ' + (err as Error).message);
    } finally {
        btn.disabled = false;
    }
}

// Research Grade means the community has confirmed the ID (validated); the
// other grades have not reached that bar. The label carries the meaning.
function validationBadge(grade: string): string {
    if (grade === 'research') return '\u2713 Research Grade';
    if (grade === 'needs_id') return 'Needs ID';
    return 'Casual';
}

function render(rows: any[]): void {
    const list = document.getElementById('list')!;
    const html = rows.map((row, i) => {
        const obs = row.obs;
        const t = row.taxon;
        const common = t.preferred_common_name || t.name || 'Unknown';
        const sci = t.name || '';
        // Prefer the observation's own photo, fall back to the taxon default.
        const photo = obs.photos?.[0]?.url || t.default_photo?.square_url || '';
        const global = row.global;
        // Link to the specific observation, not the taxon.
        const href = `https://www.inaturalist.org/observations/${obs.id}`;
        const thumb = photo ? `<img src="${esc(photo)}" alt="" loading="lazy">` : '';
        const meta = [obs.observed_on || 'no date', obs.place_guess || '']
            .filter(Boolean).map(esc).join(' \u00b7 ');
        return `<tr>
            <td>${i + 1}</td>
            <td>${thumb}</td>
            <td>
                <a href="${esc(href)}" target="_blank" rel="noopener">${esc(common)}</a><br>
                <small><i>${esc(sci)}</i> ${esc(t.rank || '')}</small><br>
                <small>${meta}</small>
            </td>
            <td>${global == null ? '\u2014' : global.toLocaleString()}</td>
            <td>${validationBadge(obs.quality_grade)}</td>
        </tr>`;
    });
    list.innerHTML = html.join('');
}

// The HTML calls loadRarest() from an inline onclick; module scope isn't global,
// so re-expose it on window to keep that handler working.
(window as any).loadRarest = loadRarest;

// Load on page open with the default observer.
loadRarest();

export {};
