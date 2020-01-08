//Requires to pull in depent libraries
const http = require('http');
const fs = require('fs');
const path = require('path');
const myPages = require('./myPages.js');
const config = require('./config.js');
const snotbotData = require('./snotbotData.js')
var mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

http.createServer(function (request, response) {
  console.log('request for ', request.url);

  var filePath = '.' + request.url;
  var extname = String(path.extname(filePath)).toLowerCase();
  var contentType = mimeTypes[extname] || 'application/octet-stream';

  if (filePath == './') {
    myPages.getIndex(response);
  } else if (filePath.startsWith('./flights')) {    // return all flights (minimal data)
      contentType = mimeTypes['.json'];
      snotbotData.getFlights().then(function(flights) {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(JSON.stringify(flights), 'utf-8');
    });
  }else if (filePath.startsWith('./flightData')) {    //return one flight (all the data)
    let flightData = `
      [
      {
      "flight": "10DR19_f2",
      "takeoff_latitude": "19.15319",
      "takeoff_longitude": -69.206062,
      "date": "2019-03-01T05:00:00.000Z",
      "country": "Dominican Republic",
      "location": "Samana",
      "waterbody": "Samana Bay",
      "objective": "EBC",
      "airframe": "Inspire 2",
      "flight_start": "7:48:21 AM",
      "flight_end": "7:51:51",
      "flight_duration": "0:03:30",
      "max_distance": "378",
      "total_mileage": "678",
      "common_name": "Humpback whale"
      }
      ]`
      contentType = mimeTypes['.json'];
      response.writeHead(200, {'Content-Type': contentType});
      response.end(flightData, 'utf-8');
  } else { // get a static file, like css, images, etc.
    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code == 'ENOENT') {
          console.log(error);
          fs.readFile('./404.html', function (error, content) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
          });
        }
        else {
          response.writeHead(500);
          response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        }
      }
      else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });
  }
}).listen(config.app.port);
console.log('Server running at http://127.0.0.1:' + config.app.port + '/');