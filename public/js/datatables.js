getTableData();

async function getTableData() {
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
                    <th>common_name</th>
                    <th>video link</th>
                    <th>flight_duration</th>
                    <th>max_altitude</th>
                    <th>max_distance</th>
                    <th>total_distance</th>
                </tr>
            </thead>
            <tbody>`;

    for (let i = 0; i < dataTableStr.length; i++) {
        dataTableHTML += "<tr><td>" + dataTableStr[i].expedition_name + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].expedition_location + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].flight + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].flight_date + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].flight_waterbody + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].objective + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].common_name + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].media_file_name + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].flight_duration + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].max_altitude + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].max_distance + "</td>";
        dataTableHTML += "<td>" + dataTableStr[i].total_distance + "</td>";

    };
    dataTableHTML += '</tbody></table>';
    document.getElementById('dataTable').innerHTML = dataTableHTML;

    $(document).ready(function () {
        $('#flightsTable').DataTable({ responsive: true });
    });
}