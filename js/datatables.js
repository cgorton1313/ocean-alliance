getTableData();


$(document).ready(function () {
    $('#flightsTable').DataTable();
});

async function getTableData() {
    // fetch tabledata and turn into a let
    let response = await fetch('./dataTable');
    let dataTableStr = await response.json();

    console.log(dataTableStr);

let dataTableHTML = `
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
    for (let i = 0; i < dataTableStr.length; i++) {
        dataTableHTML += "<tr><td>" + dataTableStr[i].expedition_name + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].expedition_location + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].flight + "</td></tr>";        
        dataTableHTML += "<tr><td>" + dataTableStr[i].flight_date + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].flight_waterbody + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].objective + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].species + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].common_name + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].flight + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].flight_duration + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].max_altitude + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].max_distance + "</td></tr>";
        dataTableHTML += "<tr><td>" + dataTableStr[i].total_distance + "</td></tr>";

    };
dataTableHTML += '</tbody></table>';
document.getElementById('dataTable').innerHTML = dataTableHTML;

}