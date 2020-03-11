// Icon Classes
var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }
});

var LeafPin = L.Icon.extend({
    options: {
        iconSize: [35, 50],
        iconAnchor: [12, 50],
        popupAnchor: [1, -34],
    }
});

var ExpeditionIcon = L.Icon.extend({
    options: {
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }
});

// Icon variables
var expeditionIcon = new ExpeditionIcon;

var blackIcon = new LeafIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png'});
var greenIcon = new LeafIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'});
var redIcon = new LeafIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'});
var blueIcon = new LeafIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'});

var blackPin = new LeafPin({iconUrl: '../images/marker_pin_black.png'});
var greenPin = new LeafPin({iconUrl:  '../images/marker_pin_green.png'});
var redPin = new LeafPin({iconUrl:  '../images/marker_pin_red.png'});
var bluePin = new LeafPin({iconUrl:  '../images/marker_pin_blue.png'});

// Feature Groups
var flightDots = L.featureGroup();
var expeditionMarkers = L.featureGroup();
//map var
var map = L.map('map').setView([35, -60], 3); 

map.on('zoomend', function() {
    sendToConsole();
});

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
}).addTo(map);

addFlightsToChart();
addExpeditionsToChart();