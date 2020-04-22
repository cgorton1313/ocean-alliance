let flightData = [{ "flight": "4SOC17_f13", "take_off_latitude": 25.963628, "take_off_longitude": -111.317311, "common_name": "Blue Whale", "media_file_name": "4SOC17_12.3_013_f13-web480.mp4" }, { "flight": "4SOC17_f19", "take_off_latitude": 26.017703, "take_off_longitude": -111.301773, "common_name": "Blue Whale", "media_file_name": "4SOC17_13.3_003_f19-web480.mp4" }, { "flight": "4SOC17_f30", "take_off_latitude": 26.074137, "take_off_longitude": -111.290998, "common_name": "Blue Whale", "media_file_name": "4SOC17_15.3_007_f30-web480.mp4" }, { "flight": "4SOC17_f50", "take_off_latitude": 26.193286, "take_off_longitude": -111.346102, "common_name": "Blue Whale", "media_file_name": "4SOC17_17.3_010_f50a-web480.mp4" }, { "flight": "6AK17_f14", "take_off_latitude": 57.313208, "take_off_longitude": -134.897963, "common_name": "Humpback Whale", "media_file_name": "6Ak17_01.10_009_f14b-web480.mp4" }];

// let dataTableRows;

// for (let i = 0; i < flightData.length; i++) {
//     dataTableRows += '<tr>';
//     dataTableRows += '<td>' + flightData[i].flight + '</td>';
//     dataTableRows += '</tr>';
// }

// document.getElementById('flightsTable').innerHTML =  dataTableRows;

$(document).ready(function () {
    $('#flightsTable').DataTable();
});