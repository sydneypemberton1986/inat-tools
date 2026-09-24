// The Leaflet global comes from a CDN <script> in the page; type it without
// bundling so `L` stays a runtime global but is fully checked.
declare const L: typeof import('leaflet');

// Initialize map centered on Austin, TX
const map = L.map('map').setView([30.2672, -97.7431], 10);

// --- Base layers -------------------------------------------------
// Switch between these via the layers control (top-left). Satellite is
// the default; the street and topographic maps render parks and other
// public green spaces in green, which the satellite view can't show.
const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
});

satellite.addTo(map); // default basemap

L.control.layers({
    'Satellite': satellite,
    'Street map (parks in green)': streets,
    'Topographic': topo
}, null as any, { position: 'topleft' }).addTo(map);

// The iNat grid rides in its own pane above whichever basemap is active,
// so switching basemaps never covers the grid.
map.createPane('gridPane');
map.getPane('gridPane')!.style.zIndex = '350';
map.getPane('gridPane')!.style.pointerEvents = 'none';

let iNatGridLayer: ReturnType<typeof L.tileLayer> | null = null;

function renderGrid(): void {
    const username = (document.getElementById('observer') as HTMLInputElement).value.trim();
    const nativeZoom = parseInt((document.getElementById('gridZoom') as HTMLInputElement).value, 10);

    if (!username) return;

    // Remove previous grid layer if it exists
    if (iNatGridLayer !== null) {
        map.removeLayer(iNatGridLayer);
    }

    const apiUrl = `https://api.inaturalist.org/v1/grid/{z}/{x}/{y}.png?user_login=${encodeURIComponent(username)}&color=red`;

    // Lock grid to the slider's specified native zoom level
    iNatGridLayer = L.tileLayer(apiUrl, {
        pane: 'gridPane',           // keep the grid above any selected basemap
        minNativeZoom: nativeZoom,  // Prevents the grid from sizing up when zooming out
        maxNativeZoom: nativeZoom,  // Prevents the grid from sizing down when zooming in
        maxZoom: 18,
        opacity: 0.7,
        attribution: '&copy; <a href="https://www.inaturalist.org">iNaturalist</a>'
    }).addTo(map);
}

// Initialize grid on page load
renderGrid();

// --- Live location tracking ---------------------------------------
// watchPosition streams GPS fixes as you move; we draw a dot + accuracy
// circle and (while "following") keep the map centered on you. Requires
// HTTPS, which GitHub Pages provides.
let watchId: number | null = null;
let meMarker: ReturnType<typeof L.marker> | null = null;
let meAccuracy: ReturnType<typeof L.circle> | null = null;
let following = false;

function setStatus(msg: string): void {
    document.getElementById('status')!.innerText = msg;
}

function toggleTracking(): void {
    const btn = document.getElementById('trackBtn')!;

    // Already tracking -> stop and clean up.
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        following = false;
        if (meMarker) { map.removeLayer(meMarker); meMarker = null; }
        if (meAccuracy) { map.removeLayer(meAccuracy); meAccuracy = null; }
        btn.innerText = '📍 Track My Location';
        setStatus('');
        return;
    }

    if (!('geolocation' in navigator)) {
        setStatus('Geolocation not supported by this browser.');
        return;
    }

    following = true;
    btn.innerText = '⏹ Stop Tracking';
    setStatus('Locating…');
    watchId = navigator.geolocation.watchPosition(onPosition, onPosError, {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 15000
    });
}

function onPosition(pos: GeolocationPosition): void {
    const { latitude, longitude, accuracy } = pos.coords;
    const latlng: [number, number] = [latitude, longitude];

    if (!meMarker) {
        meMarker = L.marker(latlng, {
            icon: L.divIcon({
                className: '',
                html: '<div class="me-dot"></div>',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
            })
        }).addTo(map);
        meAccuracy = L.circle(latlng, {
            radius: accuracy,
            color: '#1a73e8',
            weight: 1,
            fillOpacity: 0.1
        }).addTo(map);
    } else {
        meMarker.setLatLng(latlng);
        meAccuracy!.setLatLng(latlng).setRadius(accuracy);
    }

    if (following) {
        map.setView(latlng, Math.max(map.getZoom(), 14));
    }
    setStatus('Accuracy: ±' + Math.round(accuracy) + ' m');
}

function onPosError(err: GeolocationPositionError): void {
    setStatus('Location error: ' + err.message);
    following = false;
    (document.getElementById('trackBtn')!).innerText = '📍 Track My Location';
}

// Dragging the map means you want to look elsewhere; stop auto-centering
// (the dot keeps updating). Tap the button again to re-follow.
map.on('dragstart', () => { following = false; });

// The HTML calls these from inline handlers; module scope isn't global, so
// re-expose them on window to keep those handlers working.
(window as any).renderGrid = renderGrid;
(window as any).toggleTracking = toggleTracking;

export {};
