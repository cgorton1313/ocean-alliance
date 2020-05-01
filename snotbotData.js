const config = require('./config.js');
const mysql = require('mysql');
const util = require('util'); // for promisify
const log = require('simple-node-logger').createSimpleLogger('project.log');

async function getFlights() {
    // create a string that represents your SQL statement
    // ask me about using ` instead of ' in javascript, or google it
    let sql = `
SELECT everythingButMediaFiles.flight, take_off_latitude, take_off_longitude, common_name, media_file_name
  FROM (
    SELECT flights.flight, take_off_latitude, take_off_longitude, common_name
    FROM flights, flights_species, species
    WHERE take_off_latitude IS NOT null
    AND take_off_longitude IS NOT null
    AND flights.flight IS NOT null
    AND common_name IS NOT null
    AND flights.flight = flights_species.flight
    AND species.species_id = flights_species.species_id)
  AS everythingButMediaFiles
LEFT JOIN (SELECT media_files.flight, media_file_name
FROM media_files
WHERE use_on_web = 1)
  AS use_media
ON everythingButMediaFiles.flight = use_media.flight;
  `;

    // pass your SQL string to a function and wait for the response
    let result = await getQueryData(sql);

    // since we know there is only one flight, we want to turn this array
    // of objects into a 23single object before returning it. but how?
    return result;
}

async function getFlightData(flight) {
    let sql = `SELECT flights.flight, take_off_latitude, take_off_longitude, flight_date, flight_country, flight_location, flight_waterbody, objective, flight_airframe, start_time, end_time, flight_duration, max_distance, total_distance, common_name, 'media_file_name' 
  FROM flights, objective_codes, species, flights_species
  WHERE flights.flight_objective = objective_codes.objective_code
  AND flights.flight = flights_species.flight
  AND species.species_id = flights_species.species_id
  AND flights.flight IS NOT null
  AND take_off_latitude IS NOT null
  AND take_off_longitude IS NOT null
  AND flight_date IS NOT null
  AND flight_country IS NOT null
  AND flight_location IS NOT null
  AND flight_waterbody IS NOT null
  AND objective IS NOT null
  AND flight_airframe IS NOT null
  AND start_time IS NOT null
  AND end_time IS NOT null
  AND flight_duration IS NOT null
  AND max_distance IS NOT null
  AND total_distance IS NOT null
  AND common_name IS NOT null
  AND flights.flight = '` + flight + `'`;

    let result = await getQueryData(sql);
    var flightData = result[0];
    return flightData;
}

async function getExpeditions() {
    let sql = `
    SELECT expeditions.expedition_name, expeditions.expedition_location, expeditions.expedition_start_date, expeditions.expedition_end_date, expeditions.expedition_latitude, expeditions.expedition_longitude, flightCount.numFlights 
    FROM 
    (SELECT expeditions.expedition_id, COUNT(flight) as numFlights 
     FROM expeditions, flights 
     WHERE expeditions.expedition_id = flights.expedition_id 
     GROUP BY expeditions.expedition_id) as flightCount, expeditions 
     WHERE expeditions.expedition_id = flightCount.expedition_id;
    `;

    let result = await getQueryData(sql);
    return result;

}

async function getTableData() {
    let sql = `
    SELECT
    expeditions.expedition_name,
    expeditions.expedition_location,
    flights.flight,
    flights.flight_date,
    flights.flight_waterbody,
    flights.flight_duration,
    flights.max_altitude,
    flights.max_distance,
    flights.total_distance,
    objective_codes.objective,
    species.common_name,
    media_files.media_file_name,
    media_files.use_on_web
FROM
    flights,
    expeditions, 
    objective_codes, 
    flights_species,
    media_files,
    species
WHERE
    flights.expedition_id = expeditions.expedition_id
    AND flights.objective_id = objective_codes.objective_id
    AND flights_species.flight = flights.flight
    AND flights_species.species_id = species.species_id
    AND media_files.flight = flights.flight
    `;

    let result = await getQueryData(sql);
    return result;

}

// this function will connect to the database, query, disconnect, and return the query result
async function getQueryData(sql) {
    // this statement uses the values from config.js
    // it's common to keep usernames, passwords, etc., in a config file
    let connection = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    });

    // standard connect operation with some error handling
    connection.connect(function (err) {
        if (err) {
            log.info('error when connecting to db:', err);
        } else {
            log.info('Connected to database ' + config.db.database + ' as user ' + config.db.user);
        }
    });

    // this is magic. don't ask.
    let query = util.promisify(connection.query).bind(connection); // node native promisify

    // try to query the database, handle errors if they happen
    let result;
    try {
        result = await query(sql);
    } catch (err) {
        log.info(err);
        result = '{Error}';
    }

    // it's important to close the database connection
    connection.end();

    return result;
}

module.exports = {
    getFlights,
    getFlightData,
    getExpeditions,
    getTableData
}