import {fetchPhotos, saveOrder, parseObsId, type ObsPhoto} from './reorderPhotos.ts';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const form = byId<HTMLFormElement>('form');
const obsInput = byId<HTMLInputElement>('obs');
const tokenInput = byId<HTMLInputElement>('token');
const remember = byId<HTMLInputElement>('remember');
const loadBtn = byId<HTMLButtonElement>('loadBtn');
const saveBtn = byId<HTMLButtonElement>('saveBtn');
const status = byId('status');
const list = byId<HTMLUListElement>('list');

const TOKEN_KEY = 'inat_api_token';

let obsUuid = '';

/** Terse `createElement` + assign props + append children. */
function el(tag: string, props: Record<string, unknown> = {}, ...children: (Node | string)[]) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

// Prefill a token saved earlier this session.
const saved = sessionStorage.getItem(TOKEN_KEY);
if (saved) {
  tokenInput.value = saved;
  remember.checked = true;
}

/** The pasted token — accepts the raw JWT or the whole `{"api_token":"…"}` blob. */
function currentToken(): string {
  const raw = tokenInput.value.trim();
  if (!raw) return '';
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.api_token === 'string') return parsed.api_token;
  } catch { /* not JSON — treat as the raw token */ }
  return raw;
}

function renumber() {
  [...list.children].forEach((li, i) => {
    const num = li.querySelector('.rp-pos');
    if (num) num.textContent = String(i + 1);
    li.querySelector<HTMLButtonElement>('.rp-up')!.disabled = i === 0;
    li.querySelector<HTMLButtonElement>('.rp-down')!.disabled = i === list.children.length - 1;
  });
}

function move(li: HTMLElement, dir: -1 | 1) {
  if (dir === -1 && li.previousElementSibling) {
    list.insertBefore(li, li.previousElementSibling);
  } else if (dir === 1 && li.nextElementSibling) {
    list.insertBefore(li.nextElementSibling, li);
  }
  renumber();
}

function photoRow(p: ObsPhoto): HTMLElement {
  const li = el('li', {className: 'rp-item'});
  li.dataset.uuid = p.uuid;
  li.append(
    el('span', {className: 'rp-pos'}),
    el('img', {src: p.url, alt: '', loading: 'lazy'}),
    el('span', {className: 'rp-spacer'}),
    el('button', {className: 'rp-up', type: 'button', title: 'Move up', textContent: '↑',
      onclick: () => move(li, -1)}),
    el('button', {className: 'rp-down', type: 'button', title: 'Move down', textContent: '↓',
      onclick: () => move(li, 1)}),
  );
  return li;
}

async function load() {
  const id = parseObsId(obsInput.value);
  if (!id) { status.textContent = 'Enter an observation id or URL.'; return; }
  loadBtn.disabled = true;
  saveBtn.disabled = true;
  list.replaceChildren();
  status.setAttribute('aria-busy', 'true');
  status.textContent = 'Loading photos…';
  try {
    const data = await fetchPhotos(id);
    obsUuid = data.obsUuid;
    status.removeAttribute('aria-busy');
    if (data.photos.length === 0) {
      status.textContent = 'This observation has no photos.';
      return;
    }
    list.replaceChildren(...data.photos.map(photoRow));
    renumber();
    saveBtn.disabled = data.photos.length < 2;
    status.textContent = data.photos.length < 2
      ? 'Only one photo — nothing to reorder.'
      : `${data.photos.length} photos. Reorder with ↑ ↓, then Save.`;
  } catch (err) {
    status.removeAttribute('aria-busy');
    status.textContent = `Error: ${(err as Error).message}`;
  } finally {
    loadBtn.disabled = false;
  }
}

async function save() {
  const token = currentToken();
  if (!token) { status.textContent = 'Paste your iNaturalist API token first (see “Set your API token”).'; return; }
  const orderedUuids = [...list.children].map(li => (li as HTMLElement).dataset.uuid).filter((u): u is string => !!u);
  if (!obsUuid || orderedUuids.length < 2) return;

  saveBtn.disabled = true;
  saveBtn.setAttribute('aria-busy', 'true');
  status.setAttribute('aria-busy', 'true');
  status.textContent = `Saving new order (${orderedUuids.length} photos, ~1/sec)…`;
  try {
    await saveOrder(obsUuid, orderedUuids, token);
    sessionStorage[remember.checked ? 'setItem' : 'removeItem'](TOKEN_KEY, token);
    status.removeAttribute('aria-busy');
    status.textContent = '✓ Saved. Reload the observation on iNaturalist to see the new order.';
  } catch (err) {
    status.removeAttribute('aria-busy');
    const msg = (err as Error).message;
    status.textContent = /401|403|unauthor/i.test(msg)
      ? 'Auth failed — your token may be wrong or expired. Grab a fresh one and try again.'
      : `Error: ${msg}`;
  } finally {
    saveBtn.disabled = false;
    saveBtn.removeAttribute('aria-busy');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  void load();
});
saveBtn.addEventListener('click', () => void save());
