var blackIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-black.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-blue.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});


var map = L.map('map').setView([43, -70], 8);

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
}).addTo(map);


addFlightsToChart();

// Make all the flight dots and add them to the chart
async function addFlightsToChart() {
    let response = await fetch('./flights');

    let flights = await response.json(); // maybe here you want to check what the data looks like? how?

    let flightDots = L.featureGroup();

    for (let i = 0; i < flights.length; i++) {
        let dot = L.circle([flights[i].takeoff_latitude, flights[i].takeoff_longitude], {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.5,
            radius: 100
		  }).on('click', getFlightData);

    flightDots.addLayer(dot);
    // L.marker([flights[i].takeoff_latitude, flights[i].takeoff_longitude]).addTo(map).on('click', function () { getFlightData(flights[i].flight); });
    }
    flightDots.addTo(map);
}

async function getFlightData() {
    // this is going to need to wait until Izzy has a getFlightData
    // url for us. once she does, it will be very similar to the getFlights function.
    // we'll call it and get a json object (actually an array with 1 object in it)
    // it will have all the data for one flight.
    // then, we'll need to put that data into the html that Cori builds
    // for you.
    console.log(this.options);
}