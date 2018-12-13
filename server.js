/*server.js*/
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});


var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Teran&appid=25373d51e2a3b0d4b450fb5f133a0137";
var request = require('request');

request({ url: weatherAPI, json: true }, function (err, res, json) {
    if (err) {
        throw err;
    }
    console.log(json);

});
