//Requires to pull in depent libraries
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const myPages = require('./myPages.js');
const config = require('./config.js');
const snotbotData = require('./snotbotData.js')
//node logger
const log = require('simple-node-logger').createSimpleLogger('project.log');
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
  log.info('request for ', request.url);

  var filePath = '.' + request.url;
  var extname = String(path.extname(filePath)).toLowerCase();
  var contentType = mimeTypes[extname] || 'application/octet-stream';
  const queryObject = url.parse(request.url, true).query;

  if (filePath == './') {
    myPages.getIndex(response);
  } else if (filePath.startsWith('./expeditions')) {
    contentType = mimeTypes['.json'];
    snotbotData.getExpeditions().then(function (expeditions) {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(JSON.stringify(expeditions), 'utf-8');
    });     
  } else if (filePath.startsWith('./flights')) {    // return all flights (minimal data)
    contentType = mimeTypes['.json'];
    snotbotData.getFlights().then(function (flights) {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(JSON.stringify(flights), 'utf-8');
    });
  } else if (filePath.startsWith('./flightData')) {    //return one flight (all the data)
    contentType = mimeTypes['.json'];
    snotbotData.getFlightData(queryObject.flight).then(function (flightData) {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(JSON.stringify(flightData), 'utf-8'); 
    });

  } else { // get a static file, like css, images, etc.
    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code == 'ENOENT') {
          log.info(error);
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
log.info('Server running at http://127.0.0.1:' + config.app.port + '/');