// JS file used to retrieve forecasts from OpenWeather One Call api site

// api key

ApiKey = "1fc359ee9b12b02ee9633470d8821b6b";

// Variable assignment for search button to acivate the fecth function
var fetchBtn = document.getElementById("fetch-btn");

// Variable for the saved locations list
var saveLoc = document.querySelector("saved-locals");

// variable for city name
var Cities = document.querySelector("city");
var chosen = $("#selected-city");

// variable for current weather data
var nowcast = document.querySelector(".nowcast");


var City = document.getElementById("city");
var TempC = document.getElementById("temp-c");
var WindC = document.getElementById("wind-c");
var HumidC = document.getElementById("humid-c");
var UVC = document.getElementById("UV-c");
var CondC = document.getElementById("cond-c");

// variable for future weather data
var FutureDay = document.getElementById("future");



var Tempf = document.getElementById("future-temp");
var Windf = document.getElementById("future-wind");
var Humidf = document.getElementById("future-humid");
var Condf = document.getElementById("future-cond");

// Universal weather condition image icon
var WxIcon = document.createElement('img');

// fetch function for OpenWeather One Call

function getApi() {
    city_name = chosen.val();
    requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&units=imperial&appid=" + ApiKey;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("OpenWeather Current Forecast \n-----------")
            console.log(data);

            var Timezone = data.timezone / 60 / 60;
            var currentTime = moment.unix(data.dt).utc().utcOffset(Timezone)

            City.textContent = "City: " + data.name + " " + moment(currentTime).format("MMM DD, YYYY");

            TempC.textContent = "Temp: " + data.main.temp + " F";
            WindC.textContent = "Wind: " + data.wind.speed + " mph";
            HumidC.textContent = "Humidity: " + data.main.humidity + "%";
            CondC.textContent = "Conditions: " + data.weather[0].description;


            lat = data.coord.lat;
            lon = data.coord.lon;

            uviUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + ApiKey;
            fetch(uviUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log("OpenWeather UV-index\n-----------");
                    UVC.textContent = "UV-Index: " + data.current.uvi;
                    console.log("OpenWeather 5-day Forecast\n-----------")
                    console.log(data);

                    for (var i = 0; i < data.length; i++) {
                        FutureDay.textContent = daily[i].dt

                    }
                })
                
                         
                  
        })

}
fetchBtn.addEventListener('click', getApi);