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
var FutureDay1 = document.getElementById("future-1");
var FutureDay2 = document.getElementById("future-2");
var FutureDay3 = document.getElementById("future-3");
var FutureDay4 = document.getElementById("future-4");
var FutureDay5 = document.getElementById("future-5");



var Tempf1 = document.getElementById("future-temp1");
var Tempf2 = document.getElementById("future-temp2");
var Tempf3 = document.getElementById("future-temp3");
var Tempf4 = document.getElementById("future-temp4");
var Tempf5 = document.getElementById("future-temp5");

var Windf1 = document.getElementById("future-wind1");
var Windf2 = document.getElementById("future-wind2");
var Windf3 = document.getElementById("future-wind3");
var Windf4 = document.getElementById("future-wind4");
var Windf5 = document.getElementById("future-wind5");


var Humidf1 = document.getElementById("future-humid1");
var Humidf2 = document.getElementById("future-humid2");
var Humidf3 = document.getElementById("future-humid3");
var Humidf4 = document.getElementById("future-humid4");
var Humidf5 = document.getElementById("future-humid5");

var Condf1 = document.getElementById("future-cond1");
var Condf2 = document.getElementById("future-cond2");
var Condf3 = document.getElementById("future-cond3");
var Condf4 = document.getElementById("future-cond4");
var Condf5 = document.getElementById("future-cond5");

// variable for weather icon
var wxIcon = document.createElement("img")

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
            // wxIcon.setAttribute("src", `https://api.openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            // nowcast.append(wxIcon);
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
                    
                    
                    Tempf1.textContent = "Temp: " + data.daily[1].temp.max + " F";
                    Windf1.textContent = "Wind: " + data.daily[1].wind_speed + " mph";
                    Humidf1.textContent = "Humidity: " + data.daily[1].humidity + "%";
                    Condf1.textContent = "Conditions: " + data.daily[1].weather[0].description;

                    Tempf2.textContent = "Temp: " + data.daily[2].temp.max + " F";
                    Windf2.textContent = "Wind: " + data.daily[2].wind_speed + " mph";
                    Humidf2.textContent = "Humidity: " + data.daily[2].humidity + "%";
                    Condf2.textContent = "Conditions: " + data.daily[2].weather[0].description;

                    Tempf3.textContent = "Temp: " + data.daily[3].temp.max + " F";
                    Windf3.textContent = "Wind: " + data.daily[3].wind_speed + " mph";
                    Humidf3.textContent = "Humidity: " + data.daily[3].humidity + "%";
                    Condf3.textContent = "Conditions: " + data.daily[3].weather[0].description;

                    Tempf4.textContent = "Temp: " + data.daily[4].temp.max + " F";
                    Windf4.textContent = "Wind: " + data.daily[4].wind_speed + " mph";
                    Humidf4.textContent = "Humidity: " + data.daily[4].humidity + "%";
                    Condf4.textContent = "Conditions: " + data.daily[4].weather[0].description;

                    Tempf5.textContent = "Temp: " + data.daily[5].temp.max + " F";
                    Windf5.textContent = "Wind: " + data.daily[5].wind_speed + " mph";
                    Humidf5.textContent = "Humidity: " + data.daily[5].humidity + "%";
                    Condf5.textContent = "Conditions: " + data.daily[5].weather[0].description;
                })



        })

}
fetchBtn.addEventListener('click', getApi);