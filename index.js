//  Require the directories and js files
const express = require('express');
const app = express();
const path = require('path');
const config = require(__dirname + '/config.js')
const snotbotData = require(__dirname + '/snotbotData.js');
// create simple logger 
const log = require('simple-node-logger').createSimpleLogger('project.log');

// send all the static stuff
app.use(express.static(path.join(__dirname + '/public')));

//home page
app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

  // if (filePath == './') {
  //   myPages.getIndex(response);
  // } else if (filePath.startsWith('./expeditions')) {
  //   contentType = mimeTypes['.json'];
  //   snotbotData.getExpeditions().then(function (expeditions) {
  //     response.writeHead(200, { 'Content-Type': contentType });
  //     response.end(JSON.stringify(expeditions), 'utf-8');
  //   });     
  // } else if (filePath.startsWith('./flights')) {    // return all flights (minimal data)
  //   contentType = mimeTypes['.json'];
  //   snotbotData.getFlights().then(function (flights) {
  //     response.writeHead(200, { 'Content-Type': contentType });
  //     response.end(JSON.stringify(flights), 'utf-8');
  //   });
  // } else if (filePath.startsWith('./flightData')) {    //return one flight (all the data)
  //   contentType = mimeTypes['.json'];
  //   snotbotData.getFlightData(queryObject.flight).then(function (flightData) {
  //     response.writeHead(200, { 'Content-Type': contentType });
  //     response.end(JSON.stringify(flightData), 'utf-8'); 
  //   });
  // } else if (filePath.startsWith('./dataTable')) {
  //   contentType = mimeTypes['.json'];
  //   snotbotData.getTableData().then(function (tabledata) {
  //     response.writeHead(200, { 'Content-Type': contentType });
  //     response.end(JSON.stringify(tabledata), 'utf-8');
  //   });


// datatable
app.get('/datatable', async function (req, res) {
  res.json(await snotbotData.getTableData());
});

//expedition
app.get('/expeditions', async function (req, res) {
  res.json(await snotbotData.getExpeditions());
});

//flights
app.get('/flights', async function (req, res) {
  res.json(await snotbotData.getFlights());
});

//Flight Data
app.get('/flightData*', async function (req, res) {
  res.json(await snotbotData.getFlightData(req.query.flight));
});

//404 status, error, and page
app.use(function(req,res,next) {
  res.status(404).sendFile(path.join(__dirname + '/public/404.html'));
});

//Start Sever
app.listen(config.app.port, logServer());

function logServer() {
  log.info('Server running at http://127.0.0.1:' + config.app.port + '/');
};