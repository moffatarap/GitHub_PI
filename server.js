/* IRAN WEATHER NEO PIXLES AND RASPBERRY PI ZERO  */
//AUTHOR ARAPAOA MOFFAT


/* =VARABLES= */
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Teran&appid=25373d51e2a3b0d4b450fb5f133a0137";
var weatherDataJSON; //holds empty varable for weather data
var weatherDataSave; //saves weather data to file
var date = new Date(); //saves date
var dateNow = date.getHours(); //get current hours
var loopCount = 0;
var lastSavedString = "Weather Last Saved  ";
/** ==PACKAGES ==  **/
var request = require('request'); //uses request API for getting JSON
const fs = require('fs'); //uses file system API


/* 0.1 START FUNCTION */
console.log("Starting");
weatherGet();


/* #0.2 SAVE DATA TO FILE FUNCTION */
function SaveDataToFile(){
//DEBUGGING console.log("DATA" + weatherDataSave);

//#1 Saves current weather data to txt file locally
fs.writeFile("/home/pi/Documents/Iran_Weather/weatherlog.txt", weatherDataSave, function(err) {
    if(err) {
        return console.log(err);
    }


});
console.log("Adding Current Time");
lastSavedString += date.toString(); //adds string and current date to json  in order to know last time data was checked

//#2 appends date and time of when the weather was last checked to json
fs.appendFile("/home/pi/Documents/Iran_Weather/weatherlog.txt", lastSavedString, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("WEATHER JSON DATA SAVED");
});
return; //returns to previous task
}


/* #1 ACCESS WEATHER FROM IRAN USING OPEN WEATHER MAP */
function weatherGet(){
console.log("Weather Get Called");

request({ url: weatherAPI, json: true }, function (err, res, weatherDataJSON) {
    if (err) {
        throw err;
    }

console.log(weatherDataJSON); //displays current weather

/* #1.2 FORMAT WEATHER DATA NICELY AND SAVE TO JSON */
weatherDataSave = JSON.stringify(weatherDataJSON, null, 4);
console.log(weatherDataJSON); //displays current weather
SaveDataToFile(); //calls save data to file

console.log("Task Completed");
});
getCurrentTimeLoop();
}


/* #2 GET CURRENT TIME */
var loopCount = 0;
function getCurrentTimeLoop(){

dateNow = date.getHours();
console.log(dateNow);
loopCount++;
console.log(loopCount);
getCurrentTimeLoop();

}
