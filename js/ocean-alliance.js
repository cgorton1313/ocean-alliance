var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }
});

var blackIcon = new LeafIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png'});
var greenIcon = new LeafIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'});
var redIcon = new LeafIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'});
var blueIcon = new LeafIcon({iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'});


var map = L.map('map').setView([20, 0], 2);

map.on('zoomend', function() {
    sendToConsole();
    
});

function sendToConsole() {
    var zoomLevel = map.getZoom();
    console.log("map has been zoomed.");
    console.log("map zoom level: " + zoomLevel);
}

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
}).addTo(map);

addFlightsToChart();

// Make all the flight dots and add them to the chart
async function addFlightsToChart() {
    let response = await fetch('./flights');
    let flights = await response.json(); // maybe here you want to check what the data looks like? how?
    let flightDots = L.featureGroup();
    
    for (let i = 0; i < flights.length; i++) {
        let dotColor;
        let markerIcon;
        if (flights[i].common_name == 'Humpback Whale') {
            dotColor = 'red';
            markerIcon = redIcon;
        } else if (flights[i].common_name == 'Finback Whale') {
            dotColor = 'green';
            markerIcon = greenIcon;
        } else if (flights[i].common_name == 'Blue Whale') {
            dotColor = 'blue';
            markerIcon = blueIcon;
        } else {
            dotColor = 'black';
            markerIcon = blackIcon;
        }

        
        if (flights[i].media_file_name == null) {
            let dot = L.circle([flights[i].take_off_latitude, flights[i].take_off_longitude], {
                color: dotColor,
                fillColor: dotColor,
                fillOpacity: 0.5,
                radius: 50,
                flight: flights[i].flight,
                mediaFile: 'none'
            }).on('click', getFlightData);

            flightDots.addLayer(dot);
        } else {
            let dot = L.marker([flights[i].take_off_latitude, flights[i].take_off_longitude], {
                flight: flights[i].flight,
                icon: markerIcon,
                mediaFile: flights[i].media_file_name
            }).on('click', getFlightData);

            flightDots.addLayer(dot);
        }

        // L.marker([flights[i].takeoff_latitude, flights[i].takeoff_longitude]).addTo(map).on('click', getFlightData });
    }
    flightDots.addTo(map);
}

async function getFlightData() {
    // you'll need to call ./flightData?flight=xxx where xxx is the flight in question
    let response = await fetch('./flightData?flight=' + this.options.flight);
    let flightData = await response.json();
    // switch date to YYYY/MM/DD using code from Mritunjay on stackoverflow
    // https://stackoverflow.com/questions/25159330/convert-an-iso-date-to-the-date-format-yyyy-mm-dd-in-javascript
    let date = new Date(flightData.flight_date);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    
    date = year+'-' + month + '-'+dt
    // set data
    document.getElementById('flight').innerHTML = flightData.flight;
    document.getElementById('date').innerHTML = date;
    document.getElementById('waterbody').innerHTML = flightData.flight_waterbody;
    document.getElementById('Objective').innerHTML = flightData.objective;
    document.getElementById('start-time').innerHTML = flightData.start_time;
    document.getElementById('species').innerHTML = flightData.common_name;
    document.getElementById('duration').innerHTML = flightData.flight_duration;
    document.getElementById('max-distance').innerHTML = flightData.max_distance;
    document.getElementById('total-distance').innerHTML = flightData.total_distance;
    // get video
    if (this.options.mediaFile == 'none'){
        document.getElementById('videoBtn').setAttribute("style","display: none");
    }else{
        document.getElementById('videoBtn').setAttribute("style","display: block");
        document.getElementById('videoPlayerSrc').setAttribute("src", "./videos/" + this.options.mediaFile);
        document.getElementById('videoPlayer').load();
    }
}