console.log('ocean-alliance.js working');
//CODE!

var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var map = L.map('map').setView([43, -70], 8);

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
}).addTo(map);

var position = { "latitude": 42.6, "longitude": -70.6 }
var position2 = { "latitude": 40.6, "longitude": -72.6 }

L.marker([position.latitude, position.longitude]).addTo(map);

L.marker([position2.latitude, position2.longitude], { icon: greenIcon }).addTo(map);