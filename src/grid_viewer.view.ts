import type * as Leaflet from 'leaflet';

/**
 * Lockable iNat grid viewer.
 *
 * Nothing runs on import. The page's inline module script injects the browser
 * globals it owns — Leaflet's `L`, `document`, `navigator` — and calls
 * `startGridViewer`, the module's one entry point. Every other function receives
 * what it needs through parameters: there are no module-level globals, no
 * singletons, and no ambient state. Reading top to bottom goes from the entry
 * point out to the supporting detail (functions, then shapes, then constants).
 */

/** Browser globals the page supplies, so this module reaches for none itself. */
export interface GridViewerDeps {
  readonly L: typeof Leaflet;
  readonly document: Document;
  readonly navigator: Navigator;
}

/** Build the map and controls, wire the events, then draw the initial grid. */
export function startGridViewer(deps: GridViewerDeps): void {
  const {L, document, navigator} = deps;
  const els = resolveElements(document);
  const map = buildMap(L, els.map);
  const view: GridViewer = {
    L, navigator, map, els,
    gridLayer: null, shadowLayer: null,
    watchId: null, meMarker: null, meAccuracy: null, following: false,
  };
  wireEvents(view);
  renderGrid(view);
}

/** Look up every element the page promises, failing loudly if one is missing. */
function resolveElements(document: Document): Elements {
  const byId = <T extends HTMLElement>(id: string): T => {
    const node = document.getElementById(id);
    if (!node) throw new Error(`grid viewer: missing #${id}`);
    return node as T;
  };
  return {
    map: byId('map'),
    observer: byId<HTMLInputElement>('observer'),
    gridZoom: byId<HTMLInputElement>('gridZoom'),
    zoomVal: byId('zoomVal'),
    updateBtn: byId<HTMLButtonElement>('updateBtn'),
    trackBtn: byId<HTMLButtonElement>('trackBtn'),
    status: byId('status'),
  };
}

/** Create the Leaflet map, its basemaps + switcher, and the grid panes. */
function buildMap(L: typeof Leaflet, container: HTMLElement): Leaflet.Map {
  const map = L.map(container).setView([30.26, -97.74], 10);

  const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {maxZoom: 18, attribution: ESRI_ATTRIBUTION});
  const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: OSM_ATTRIBUTION});
  const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {maxZoom: 17, attribution: TOPO_ATTRIBUTION});

  satellite.addTo(map); // default basemap
  L.control.layers({Satellite: satellite, Streets: streets, Topography: topo}, undefined, {position: 'topleft'}).addTo(map);

  createGridPanes(map);
  return map;
}

/** The locked grid rides in its own pane above whichever basemap is active, so
 *  switching basemaps never covers it; a coarser "shadow" grid sits just beneath. */
function createGridPanes(map: Leaflet.Map): void {
  const grid = map.createPane('gridPane');
  grid.style.zIndex = '350';
  grid.style.pointerEvents = 'none';
  const shadow = map.createPane('gridShadowPane');
  shadow.style.zIndex = '340';
  shadow.style.pointerEvents = 'none';
}

/** Bind the controls and map gestures to the grid and tracking handlers. */
function wireEvents(view: GridViewer): void {
  const {els, map} = view;
  els.gridZoom.addEventListener('input', () => { els.zoomVal.textContent = els.gridZoom.value; });
  els.gridZoom.addEventListener('change', () => renderGrid(view));
  els.observer.addEventListener('change', () => renderGrid(view));
  els.updateBtn.addEventListener('click', () => renderGrid(view));
  els.trackBtn.addEventListener('click', () => toggleTracking(view));
  // Dragging the map means you want to look elsewhere; stop auto-centering.
  map.on('dragstart', () => { view.following = false; });
}

/** Lock the iNat grid to the slider's native zoom, with a paler coarser grid one
 *  level down so each cell sits inside the cell it belongs to. */
function renderGrid(view: GridViewer): void {
  const {L, map, els} = view;
  const username = els.observer.value.trim();
  if (!username) return;
  const nativeZoom = parseInt(els.gridZoom.value, 10);

  if (view.gridLayer) map.removeLayer(view.gridLayer);
  if (view.shadowLayer) { map.removeLayer(view.shadowLayer); view.shadowLayer = null; }

  const tileUrl = `https://api.inaturalist.org/v1/grid/{z}/{x}/{y}.png?user_login=${encodeURIComponent(username)}&color=blue`;

  const shadowZoom = nativeZoom - 1;
  if (shadowZoom >= 0) {
    view.shadowLayer = L.tileLayer(tileUrl, {
      pane: 'gridShadowPane', minNativeZoom: shadowZoom, maxNativeZoom: shadowZoom,
      maxZoom: 18, opacity: SHADOW_OPACITY, attribution: INAT_ATTRIBUTION,
    }).addTo(map);
  }

  // Locking min === max native zoom stops the grid resizing as you zoom.
  view.gridLayer = L.tileLayer(tileUrl, {
    pane: 'gridPane', minNativeZoom: nativeZoom, maxNativeZoom: nativeZoom,
    maxZoom: 18, opacity: 0.7, attribution: INAT_ATTRIBUTION,
  }).addTo(map);
}

/** Start or stop streaming GPS fixes. While tracking we draw a dot + accuracy
 *  circle and, until the user drags, keep the map centered. HTTPS/localhost only. */
function toggleTracking(view: GridViewer): void {
  const {navigator, map, els} = view;
  if (view.watchId !== null) { // already tracking -> stop and clean up
    navigator.geolocation.clearWatch(view.watchId);
    view.watchId = null;
    view.following = false;
    if (view.meMarker) { map.removeLayer(view.meMarker); view.meMarker = null; }
    if (view.meAccuracy) { map.removeLayer(view.meAccuracy); view.meAccuracy = null; }
    els.trackBtn.textContent = TRACK_START_LABEL;
    els.status.textContent = '';
    return;
  }
  if (!('geolocation' in navigator)) {
    els.status.textContent = 'Geolocation not supported by this browser.';
    return;
  }
  view.following = true;
  els.trackBtn.textContent = TRACK_STOP_LABEL;
  els.status.textContent = 'Locating…';
  view.watchId = navigator.geolocation.watchPosition(
    pos => onPosition(view, pos),
    err => onPosError(view, err),
    {enableHighAccuracy: true, maximumAge: 1000, timeout: 15000},
  );
}

/** Draw or move the "you are here" marker for each incoming GPS fix. */
function onPosition(view: GridViewer, pos: GeolocationPosition): void {
  const {L, map, els} = view;
  const {latitude, longitude, accuracy} = pos.coords;
  const latlng: [number, number] = [latitude, longitude];
  if (!view.meMarker) {
    view.meMarker = L.marker(latlng, {
      icon: L.divIcon({className: '', html: '<div class="me-dot"></div>', iconSize: [16, 16], iconAnchor: [8, 8]}),
    }).addTo(map);
    view.meAccuracy = L.circle(latlng, {radius: accuracy, color: '#1a73e8', weight: 1, fillOpacity: 0.1}).addTo(map);
  } else {
    view.meMarker.setLatLng(latlng);
    view.meAccuracy!.setLatLng(latlng).setRadius(accuracy);
  }
  if (view.following) map.setView(latlng, Math.max(map.getZoom(), 14));
  els.status.textContent = `Accuracy: ±${Math.round(accuracy)} m`;
}

/** Surface a geolocation failure and drop back to the idle tracking state. */
function onPosError(view: GridViewer, err: GeolocationPositionError): void {
  view.els.status.textContent = `Location error: ${err.message}`;
  view.following = false;
  view.els.trackBtn.textContent = TRACK_START_LABEL;
}

/** The page elements the viewer drives, resolved once at startup. */
interface Elements {
  readonly map: HTMLElement;
  readonly observer: HTMLInputElement;
  readonly gridZoom: HTMLInputElement;
  readonly zoomVal: HTMLElement;
  readonly updateBtn: HTMLButtonElement;
  readonly trackBtn: HTMLButtonElement;
  readonly status: HTMLElement;
}

/** The whole viewer's state: fixed dependencies plus the mutable Leaflet layers
 *  and tracking fields the handlers update in place. */
interface GridViewer {
  readonly L: typeof Leaflet;
  readonly navigator: Navigator;
  readonly map: Leaflet.Map;
  readonly els: Elements;
  gridLayer: Leaflet.TileLayer | null;
  shadowLayer: Leaflet.TileLayer | null;
  watchId: number | null;
  meMarker: Leaflet.Marker | null;
  meAccuracy: Leaflet.Circle | null;
  following: boolean;
}

/** How pale the coarser shadow grid reads relative to the main grid. */
const SHADOW_OPACITY = 0.15;

const TRACK_START_LABEL = '📍 Track My Location';
const TRACK_STOP_LABEL = '⏹ Stop Tracking';

const INAT_ATTRIBUTION = '&copy; <a href="https://www.inaturalist.org">iNaturalist</a>';
const ESRI_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TOPO_ATTRIBUTION = 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)';
