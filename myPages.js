module.exports = {
    getIndex
  }
  let fs = require('fs');
  async function getIndex (response) {
    fs.readFile('index.html', function(err, data) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(data);
      response.end();
    });  
  }