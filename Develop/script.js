// JS file used to retrieve forecasts from OpenWeather One Call api site

// Variable assignment for search button to acivate the fecth function
var fecthBtn = document.getElementById("fetch-btn");

// Variable for the saved locations list
var saveLoc = document.querySelector(".saved-locals");

// variable for current weather data
var currentWx = document.querySelector(".current-wx");
var TempC = document.querySelector(".temp-c");
var WindC = document.querySelector(".wind-c");
var HumidC = document.querySelector(".humid-c");
var UVC = document.querySelector(".UV-c");
var CondC = document.querySelector(".cond-c");

// variable for future weather data
var futureWx = document.querySelector(".future-wx");

// fetch function for OpenWeather One Call

function getApi() {
    var requetURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&units=imperial&appid=1fc359ee9b12b02ee9633470d8821b6b";
    fetch(requetURL)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log("OpenWeather Current Forecast \n-----------")
            console.log(data);
            for (var i = 0; i < data.length; i++) {
            }
        })
}

fecthBtn.addEventListener('click', getApi);