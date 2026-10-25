// The Leaflet global comes from a CDN <script> in the page; type it without
// bundling so `L` stays a runtime global but is fully checked.
declare const L: typeof import('leaflet');

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const observer = byId<HTMLInputElement>('observer');
const gridZoom = byId<HTMLInputElement>('gridZoom');
const zoomVal = byId('zoomVal');
const updateBtn = byId<HTMLButtonElement>('updateBtn');
const trackBtn = byId<HTMLButtonElement>('trackBtn');
const status = byId('status');

/** How pale the coarser shadow grid reads relative to the main grid. */
const SHADOW_OPACITY = 0.15;

const map = L.map('map').setView([30.26, -97.74], 10);

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
});
const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
});

satellite.addTo(map); // default basemap
L.control.layers({Satellite: satellite, Streets: streets, Topography: topo}, undefined, {position: 'topleft'}).addTo(map);

// The iNat grid rides in its own pane above whichever basemap is active, so
// switching basemaps never covers it; a coarser "shadow" grid sits just beneath.
map.createPane('gridPane');
map.getPane('gridPane')!.style.zIndex = '350';
map.getPane('gridPane')!.style.pointerEvents = 'none';
map.createPane('gridShadowPane');
map.getPane('gridShadowPane')!.style.zIndex = '340';
map.getPane('gridShadowPane')!.style.pointerEvents = 'none';

let gridLayer: L.TileLayer | null = null;
let shadowLayer: L.TileLayer | null = null;

/** Lock the iNat observation grid to the slider's native zoom, with a paler
 *  coarser grid one level down so each cell sits inside the cell it belongs to. */
function renderGrid(): void {
  const username = observer.value.trim();
  if (!username) return;
  const nativeZoom = parseInt(gridZoom.value, 10);

  if (gridLayer) map.removeLayer(gridLayer);
  if (shadowLayer) { map.removeLayer(shadowLayer); shadowLayer = null; }

  const tileUrl = `https://api.inaturalist.org/v1/grid/{z}/{x}/{y}.png?user_login=${encodeURIComponent(username)}&color=blue`;
  const attribution = '&copy; <a href="https://www.inaturalist.org">iNaturalist</a>';

  const shadowZoom = nativeZoom - 1;
  if (shadowZoom >= 0) {
    shadowLayer = L.tileLayer(tileUrl, {
      pane: 'gridShadowPane', minNativeZoom: shadowZoom, maxNativeZoom: shadowZoom,
      maxZoom: 18, opacity: SHADOW_OPACITY, attribution,
    }).addTo(map);
  }

  // Locking min === max native zoom stops the grid resizing as you zoom.
  gridLayer = L.tileLayer(tileUrl, {
    pane: 'gridPane', minNativeZoom: nativeZoom, maxNativeZoom: nativeZoom,
    maxZoom: 18, opacity: 0.7, attribution,
  }).addTo(map);
}

// --- Live location tracking -------------------------------------------------
// watchPosition streams GPS fixes as you move; we draw a dot + accuracy circle
// and (while "following") keep the map centered. Requires HTTPS / localhost.
let watchId: number | null = null;
let meMarker: L.Marker | null = null;
let meAccuracy: L.Circle | null = null;
let following = false;

function toggleTracking(): void {
  if (watchId !== null) { // already tracking -> stop and clean up
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    following = false;
    if (meMarker) { map.removeLayer(meMarker); meMarker = null; }
    if (meAccuracy) { map.removeLayer(meAccuracy); meAccuracy = null; }
    trackBtn.textContent = '📍 Track My Location';
    status.textContent = '';
    return;
  }
  if (!('geolocation' in navigator)) {
    status.textContent = 'Geolocation not supported by this browser.';
    return;
  }
  following = true;
  trackBtn.textContent = '⏹ Stop Tracking';
  status.textContent = 'Locating…';
  watchId = navigator.geolocation.watchPosition(onPosition, onPosError, {enableHighAccuracy: true, maximumAge: 1000, timeout: 15000});
}

function onPosition(pos: GeolocationPosition): void {
  const {latitude, longitude, accuracy} = pos.coords;
  const latlng: [number, number] = [latitude, longitude];
  if (!meMarker) {
    meMarker = L.marker(latlng, {
      icon: L.divIcon({className: '', html: '<div class="me-dot"></div>', iconSize: [16, 16], iconAnchor: [8, 8]}),
    }).addTo(map);
    meAccuracy = L.circle(latlng, {radius: accuracy, color: '#1a73e8', weight: 1, fillOpacity: 0.1}).addTo(map);
  } else {
    meMarker.setLatLng(latlng);
    meAccuracy!.setLatLng(latlng).setRadius(accuracy);
  }
  if (following) map.setView(latlng, Math.max(map.getZoom(), 14));
  status.textContent = `Accuracy: ±${Math.round(accuracy)} m`;
}

function onPosError(err: GeolocationPositionError): void {
  status.textContent = `Location error: ${err.message}`;
  following = false;
  trackBtn.textContent = '📍 Track My Location';
}

gridZoom.addEventListener('input', () => { zoomVal.textContent = gridZoom.value; });
gridZoom.addEventListener('change', renderGrid);
observer.addEventListener('change', renderGrid);
updateBtn.addEventListener('click', renderGrid);
trackBtn.addEventListener('click', toggleTracking);
// Dragging the map means you want to look elsewhere; stop auto-centering.
map.on('dragstart', () => { following = false; });

renderGrid();
