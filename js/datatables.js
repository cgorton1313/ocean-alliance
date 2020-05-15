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
//getTableData();
    </tbody>
    </table>
`;

$(document).ready(function () {
    $('#flightsTable').DataTable();
});

async function getTableData() {
    // fetch tabledata and turn into a let
    let response = await fetch('./dataTable');
    let dataTableStr = await response.json();

    console.log(dataTableStr);
    let str = "<table>"
    for (let i = 0; i < dataTableStr.length; i++) {
        dataTableStr += "<tr><td>" + dataTableStr[i] + "</td></tr>";
    };
    "</table>"
}

document.getElementById('dataTable').innerHTML = dataTableStr;