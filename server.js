/* IRAN WEATHER NEO PIXLES AND RASPBERRY PI ZERO  */
//AUTHOR ARAPAOA MOFFAT


/* =VARABLES= */
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Teran&appid=25373d51e2a3b0d4b450fb5f133a0137";


/** ==PACKAGES ==  **/
var request = require('request');



/* #0 SETUP SERVER FOR DEBUGGING  */
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

/* #0.1 SERVER FUNCTION */
const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});


/* #1 ACCESS WEATHER FROM IRAN USING OPEN WEATHER MAP */
request({ url: weatherAPI, json: true }, function (err, res, json) {
    if (err) {
        throw err;
    }
    console.log(json);

});
