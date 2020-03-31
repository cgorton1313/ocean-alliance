let myData = [
    {
        "name": "Tiger Nixon",
        "position": "System Architect",
        "salary": "$3,120",
        "start_date": "2011/04/25",
        "office": "Edinburgh",
        "extn": "5421"
    },
    {
        "name": "Garrett Winters",
        "position": "Director",
        "salary": "$5,300",
        "start_date": "2011/07/25",
        "office": "Edinburgh",
        "extn": "8422"
    }
];

getFlights();

async function getFlights() {
    let response = await fetch('./flights');
    let flights = await response.json();
    console.log(flights);

    $('#example').DataTable({
        data: flights,
        columns: [
            { data: 'flight' },
            { data: 'common_name' }
        ]
    });
}

