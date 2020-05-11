console.log("we're here");
getTableData();

let dataTable = `
<table id="flightsTable" class="display">
    <thead>
        <tr>
            <th>expedition_name</th>
            <th>expedition_location</th>
            <th>flight</th>
            <th>flight_date</th>
            <th>flight_waterbody</th>
            <th>objective</th>
            <th>species</th>
            <th>common_name</th>
            <th>video link</th>
            <th>flight_duration</th>
            <th>max_altitude</th>
            <th>max_distance</th>
            <th>total_distance</th>
        </tr>
    </thead>
<tbody>
`;

document.getElementById('dataTable').innerHTML=dataTable;

$(document).ready( function () {
    $('#flightsTable').DataTable();
    } );

async function getTableData() {
        // fetch tabledata and turn into a let
        let response = await fetch('./dataTable');
        let dataTable = await response.json();
    
        // for (let i = 0; i < expeditions.length; i++) {
        //     let exIcon = L.marker([expeditions[i].expedition_latitude, expeditions[i].expedition_longitude], {
        //         icon: expeditionIcon
        //     });
    
        // };
    console.log(dataTable);
    }

//hello im here