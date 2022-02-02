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
var wxImg = document.createElement("img")

var City = document.getElementById("city");
var TempC = document.getElementById("temp-c");
var WindC = document.getElementById("wind-c");
var HumidC = document.getElementById("humid-c");
var UVC = document.getElementById("UV-c");
var CondC = document.getElementById("cond-c");

// variable for future weather data
var futureWx = document.querySelector(".future-wx");

// Universal weather condition image icon

// fetch function for OpenWeather One Call

function getApi() {
    city_name = chosen.val();
    requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&units=imperial&appid="+ApiKey;
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log("OpenWeather Current Forecast \n-----------")
        console.log(data);

        wxImg.src = "https://api.openweather.org/img/wn/"+data.weather[0].icon+"@2px.png";
        nowcast.append(wxImg);
        
        City.textContent = "City: " + data.name + " " + moment(Date(data.dt)).format("MMM DD, YYYY");
        TempC.textContent = "Temp: " + data.main.temp + " F";
        WindC.textContent = "Wind: " + data.wind.speed + " mph";
        HumidC.textContent = "Humidity: " + data.main.humidity + "%";
        CondC.textContent = "Conditions: " + data.weather[0].description;
    })
}


fetchBtn.addEventListener('click', getApi);