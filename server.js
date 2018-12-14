/* IRAN WEATHER NEO PIXLES AND RASPBERRY PI ZERO  */
//AUTHOR ARAPAOA MOFFAT


/* =VARABLES= */
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Teran&appid=25373d51e2a3b0d4b450fb5f133a0137";
var weatherDataJSON; //holds empty varable for weather data
var weatherDataTest;
/** ==PACKAGES ==  **/
var request = require('request'); //uses request API for getting JSON
const fs = require('fs'); //uses file system API


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
  weatherGet(); //calls weather function to run after server has started
});

/* #0.2 SAVE DATA TO FILE FUNCTION */
function SaveDataToFile(){
console.log("DATA" + weatherDataTest);
fs.writeFile("/home/pi/Documents/Iran_Weather/weatherlog.txt", weatherDataTest, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
return; //returns to previous task
}


/* #1 ACCESS WEATHER FROM IRAN USING OPEN WEATHER MAP */
function weatherGet(){

request({ url: weatherAPI, json: true }, function (err, res, weatherDataJSON) {
    if (err) {
        throw err;
    }
weatherDataTest = weatherDataJSON.toString();
    console.log(weatherDataJSON);
SaveDataToFile(); //calls save data to file
//weatherDataJSON === json; //sets varable of weatherDataJSON to be JSON
});
}
