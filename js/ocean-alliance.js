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

var positions = [{ "flight": "Ak1", "latitude": 42.6, "longitude": -70.6 }, { "flight": "", "latitude": 40.6, "longitude": -72.6 }, { "flight": "", "latitude": 40.9, "longitude": -70.9 }];

for (let i = 0; i < positions.length; i++) {
    L.marker([positions[i].latitude, positions[i].longitude]).addTo(map).on('click', function () {getFlightData(positions[i].flight);});
    console.log('hello');
}

function getFlightData(flight) {
    console.log(flight)
}
