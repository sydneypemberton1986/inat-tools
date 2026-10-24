import {main} from './rarest.ts';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const form = byId<HTMLFormElement>('form');
const observer = byId<HTMLInputElement>('observer');
const loadBtn = byId<HTMLButtonElement>('loadBtn');
const status = byId('status');
const list = byId('list');

const GRADE_LABEL: Record<string, string> = {
  research: '✓ Research Grade',
  needs_id: 'Needs ID',
  casual: 'Casual',
};

/** Terse `createElement` + assign props + append children. */
function el(tag: string, props: Record<string, unknown> = {}, ...children: (Node | string)[]) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function render(rows: Awaited<ReturnType<typeof main>>) {
  list.replaceChildren(...rows.map((row, i) => {
    const taxon = row.taxon;
    const name = taxon?.preferred_common_name || taxon?.name || 'Unknown';
    const meta = [row.observed_on, row.place_guess].filter(Boolean).join(' · ');
    return el('tr', {},
      el('td', {textContent: String(i + 1)}),
      el('td', {}, row.thumbnail_url ? el('img', {src: row.thumbnail_url, alt: '', loading: 'lazy'}) : ''),
      el('td', {},
        el('a', {href: row.uri ?? '#', target: '_blank', rel: 'noopener', textContent: name}),
        el('br'),
        el('small', {}, el('i', {textContent: taxon?.name ?? ''})),
        el('br'),
        el('small', {textContent: meta}),
      ),
      el('td', {textContent: row.observations_count.toLocaleString()}),
      el('td', {textContent: GRADE_LABEL[row.quality_grade ?? ''] ?? 'Casual'}),
    );
  }));
}

async function load() {
  const userLogin = observer.value.trim();
  if (!userLogin) return;
  loadBtn.disabled = true;
  list.replaceChildren();
  status.textContent = 'Loading…';
  try {
    const rows = await main(userLogin);
    render(rows);
    status.textContent = `${rows.length} rarest observations`;
  } catch (err) {
    status.textContent = `Error: ${(err as Error).message}`;
  } finally {
    loadBtn.disabled = false;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  void load();
});

void load();
