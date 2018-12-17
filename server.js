/* IRAN WEATHER NEO PIXLES AND RASPBERRY PI ZERO  */
//AUTHOR ARAPAOA MOFFAT


/* =VARABLES= */
//JSON VAR
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Teran&appid=25373d51e2a3b0d4b450fb5f133a0137";
var weatherDataJSON; //holds empty varable for weather data
var weatherDataSave; //saves weather data to file
var lastSavedString = "Weather Last Saved  "; //Sring for saving last saved time
var weatherLogPath = "/home/pi/Documents/Iran_Weather/weatherlog.txt";
var timerLogPath = "/home/pi/Documents/Iran_Weather/loopTest.txt";
var pathToSave =""; //path to save is blank
var dataToSave = 0; //var for data to be saved to file
var weatherMethod = 0; //weatherMethod
var only = 0;

//DATE VAR
var date = new Date(); //saves date
var changingDate = new Date(); //saves date for loop
var dateNowHours = date.getHours(); //get current hours
var dateNowMin = date.getMinutes(); //gets current min
var loopCount = 0;

/** ==PACKAGES ==  **/
var request = require('request'); //uses request API for getting JSON
const fs = require('fs'); //uses file system API


/* 0.1 START FUNCTION */
console.log("Starting");
weatherGet();


/* #0.2 SAVE DATA TO FILE FUNCTION */
function SaveDataToFile(){
console.log(weatherMethod + "_WEATHER METHOD VALUE");
//DEBUGGING console.log("DATA" + weatherDataSave);
console.log (pathToSave,dataToSave);
//#1 Saves current weather data to txt file locally
fs.writeFile(pathToSave, dataToSave, function(err) {
    if(err) {
        return console.log(err);
    }
   console.log("DATA TO SAVE");
});
console.log("Adding Current Time");
lastSavedString += date.toString(); //adds string and current date to json  in order to know last time data was checked

//#2 appends date and time of when the weather was last checked to json
if (weatherMethod === 1 && only === 1) {
fs.appendFile(pathToSave, lastSavedString, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("WEATHER JSON DATA SAVED");
weatherMethod = 0; //sets weather method to 0
});
}

pathToSave = "";
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
dataToSave = weatherDataSave;
pathToSave = weatherLogPath;
weatherMethod = 1;
SaveDataToFile(); //calls save data to file
only = 0;
console.log("Task Completed");
});



getCurrentTimeLoop();

}



/* #2 GET CURRENT TIME */
function getCurrentTimeLoop(){
changingDate = new Date();
dateNowHours = changingDate.getHours();
dateNowMinutes = changingDate.getMinutes();
weatherMethod = 0; //sets weather method to active
console.log(dateNowHours, dateNowMinutes);
loopCount++;
pathToSave = timerLogPath;//sets path to save to file
dataToSave = loopCount;
SaveDataToFile(); //Saves Data to File
console.log(loopCount);



}

setInterval(getCurrentTimeLoop, 60000);

