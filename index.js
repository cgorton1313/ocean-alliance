//  Require the directories and js files
const express = require('express');
const app = express();
const path = require('path');
const config = require(__dirname + '/config.js')
const snotbotData = require(__dirname + '/snotbotData.js');
// create simple logger 
const log = require('simple-node-logger').createSimpleLogger('project.log');

// send all the static stuff
app.use(express.static(__dirname + '/public'));

//home page
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//expedition
app.get('/expeditions', function(req,res){
  res.json(snotbotData.getExpedition());
});


app.listen(config.app.port, serverRunning() );

function serverRunning() {
  log.info('Server running at http://127.0.0.1:' + config.app.port + '/');
};



// // send index.html
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });
