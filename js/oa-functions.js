function switchMarkers() {  
    // change the feature group (markers) according to the zoom level
    var zoomLevel = map.getZoom();

    if (zoomLevel > 3) {
        //remove expeditions markers from map
        expeditionMarkers.eachLayer(function (layer) {
            map.removeLayer(layer);
        });
        // add flight dots to map
        flightDots.eachLayer(function (layer) {
            map.addLayer(layer);
        });
    } else {
        //add expeditions marker to map
        expeditionMarkers.eachLayer(function (layer) {
            map.addLayer(layer);
        });
        //remove fight dots from map
        flightDots.eachLayer(function (layer) {
            map.removeLayer(layer);
        });
    }

}

//this function was made by using Jeffrey Morgan's code as a base.  
// His code is under [The MIT License](https://opensource.org/licenses/MIT) 
// [Here is here you can find his orginal code](https://usabilityetc.com/2016/07/how-to-center-a-leaflet-map-on-a-marker/)
function centerLeafletMapOnMarker(expid) {
    var latLngs = [ expid.expedition_latitude, expid.expedition_longitude];
    var markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
    console.log('zoom level is ' +map.getZoom() );
  };

async function createFlightDots() { 
    let response = await fetch('./flights');
    let flights = await response.json();

    for (let i = 0; i < flights.length; i++) {
        let markerPin;
        let markerIcon;
        if (flights[i].common_name == 'Humpback Whale') {
            markerPin = redPin;
            markerIcon = redIcon;
        } else if (flights[i].common_name == 'Finback Whale') {
            markerPin = greenPin;
            markerIcon = greenIcon;
        } else if (flights[i].common_name == 'Blue Whale') {
            markerPin = blackPin;
            markerIcon = blueIcon;
        } else {
            markerPin = blackPin;
            markerIcon = blackIcon;
        }


        if (flights[i].media_file_name == null) {
            let dot = L.marker([flights[i].take_off_latitude, flights[i].take_off_longitude], {
                flight: flights[i].flight,
                icon: markerPin,
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
    }
}

async function addExpeditionsToChart() {
    // fetch expedition and turn into a let
    let response = await fetch('./expeditions');
    let expeditions = await response.json();

    for (let i = 0; i < expeditions.length; i++) {
        let exIcon = L.marker([expeditions[i].expedition_latitude, expeditions[i].expedition_longitude], {
            icon: expeditionIcon
        }).bindPopup(createPopUpContent(expeditions,i)).openPopup();

        expeditionMarkers.addLayer(exIcon);
    };

    expeditionMarkers.addTo(map);
}


async function getFlightData() {
    let response = await fetch('./flightData?flight=' + this.options.flight);
    let flightData = await response.json();
    // Unhide Data Colmun
    document.getElementById('dataColmun').setAttribute("style", "display: block");
    // switch date to YYYY/MM/DD using code from Mritunjay on stackoverflow
    // https://stackoverflow.com/questions/25159330/convert-an-iso-date-to-the-date-format-yyyy-mm-dd-in-javascript
    let date = new Date(flightData.flight_date);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    date = year + '-' + month + '-' + dt
    // set data
    document.getElementById('flight').innerHTML = flightData.flight;
    document.getElementById('date').innerHTML = date;
    document.getElementById('waterbody').innerHTML = flightData.flight_waterbody;
    document.getElementById('Objective').innerHTML = flightData.objective;
    document.getElementById('start-time').innerHTML = flightData.start_time.slice(0, 8);
    document.getElementById('species').innerHTML = flightData.common_name;
    document.getElementById('duration').innerHTML = flightData.flight_duration;
    document.getElementById('max-distance').innerHTML = flightData.max_distance;
    document.getElementById('total-distance').innerHTML = flightData.total_distance;
    // get video
    if (this.options.mediaFile == 'none') {
        document.getElementById('videoBtn').setAttribute("style", "display: none");
    } else {
        document.getElementById('videoBtn').setAttribute("style", "display: block");
        document.getElementById('videoPlayerSrc').setAttribute("src", "./videos/" + this.options.mediaFile);
        document.getElementById('videoPlayer').load();
    }
}

 function createPopUpContent(response,expeditionsNum){
    // get data for specific expedition
    let expedition = response[expeditionsNum];

    // create let to hold the html for the popup content
    let html = '<div class="popup__content">';
    //Add Expedition Name
    html += '<h1 class="exped_name">Expedition ' +expedition.expedition_name+ '</h1>';
    // start unordered list for data
    html += '<div class="exped_list"><ul>';
    // location
    html += '<li>Location: ' +expedition.expedition_location+ '</li>';
    // number of flights
    html += '<li>Number of Flights: ' +expedition.numFlights+ '</li>';
    html += '<li> <a href=\"#\" onclick=\"centerLeafletMapOnMarker(' +expedition+ ')\">HELLO</a> </li>';
    

    html += '</ul></div>'; // End list 
    html += '</div>'; // End Popup Content

    console.log(html);
    return html;
};