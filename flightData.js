// function for creating flight object for the endpoint array 

function flight(flight, lat, long) {
    this.flight = flight;
    this.takeoff_latitude = lat;
    this.takeoff_longitude = long;
}

module.exports = {
    flight
  }