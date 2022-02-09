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
var nowcast = document.getElementById("nowcast");


var City = document.getElementById("city");
var TempC = document.getElementById("temp-c");
var WindC = document.getElementById("wind-c");
var HumidC = document.getElementById("humid-c");
var UVC = document.getElementById("UV-c");
var CondC = document.getElementById("cond-c");

// variable for future weather data dates
var futureDay1 = document.getElementById("future-1");
var futureDay2 = document.getElementById("future-2");
var futureDay3 = document.getElementById("future-3");
var futureDay4 = document.getElementById("future-4");
var futureDay5 = document.getElementById("future-5");

// Array which holds all date variables
var futureD = [
    futureDay1,
    futureDay2,
    futureDay3,
    futureDay4,
    futureDay5
];

// variable for future weather data
var futureCast = document.querySelector(".daily-wx");

// Variables for future temperature
var Tempf1 = document.getElementById("future-temp1");
var Tempf2 = document.getElementById("future-temp2");
var Tempf3 = document.getElementById("future-temp3");
var Tempf4 = document.getElementById("future-temp4");
var Tempf5 = document.getElementById("future-temp5");

// Array that contains all temperature variables
var Temps = [
    Tempf1,
    Tempf2,
    Tempf3,
    Tempf4,
    Tempf5
];

// Variables for future wind speeds
var Windf1 = document.getElementById("future-wind1");
var Windf2 = document.getElementById("future-wind2");
var Windf3 = document.getElementById("future-wind3");
var Windf4 = document.getElementById("future-wind4");
var Windf5 = document.getElementById("future-wind5");

// Array that stores all wind variables
var Winds = [
    Windf1,
    Windf2,
    Windf3,
    Windf4,
    Windf5
];

// Variables for future humidity values
var Humidf1 = document.getElementById("future-humid1");
var Humidf2 = document.getElementById("future-humid2");
var Humidf3 = document.getElementById("future-humid3");
var Humidf4 = document.getElementById("future-humid4");
var Humidf5 = document.getElementById("future-humid5");

// Array that stores all humidity variables
var Humids = [
    Humidf1,
    Humidf2,
    Humidf3,
    Humidf4,
    Humidf5
];

// Variables for future weather conditions
var Condf1 = document.getElementById("future-cond1");
var Condf2 = document.getElementById("future-cond2");
var Condf3 = document.getElementById("future-cond3");
var Condf4 = document.getElementById("future-cond4");
var Condf5 = document.getElementById("future-cond5");

// Array that stores all condition variables
var conds = [
    Condf1,
    Condf2,
    Condf3,
    Condf4,
    Condf5
];

// variable for weather icon
var wx_nowIcon = document.getElementById("weather-now-icon");
var wx_nextIcon = document.getElementById("weather-next-icon");

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

            wx_nowIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"); 
            City.textContent = "City: " + data.name + " " + moment(currentTime).format("MMM DD, YYYY");
            TempC.textContent = "Temp: " + data.main.temp + " F";
            WindC.textContent = "Wind: " + data.wind.speed + " mph";
            HumidC.textContent = "Humidity: " + data.main.humidity + "%";
            CondC.textContent = "Conditions: " + data.weather[0].description;


            lat = data.coord.lat;
            lon = data.coord.lon;

            uvi_futureUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + ApiKey;
            fetch(uvi_futureUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log("OpenWeather UV-index\n-----------");
                    uv_index = data.current.uvi;
                    if (uv_index <= 1) {
                        UVC.setAttribute("class", "uv_good");
                        UVC.textContent = "UV-Index: " + uv_index;
                    } else if (uv_index > 1 && uv_index <= 3) {
                        UVC.setAttribute("class", "uv_meh")
                        UVC.textContent = "UV-Index: " + uv_index;
                    } else if (uv_index > 3 && uv_index <= 5){
                        UVC.setAttribute("class", "uv_um");
                        UVC.textContent = "UV-Index: " + uv_index;
                    } else if (uv_index > 5 && uv_index <= 7){
                        UVC.setAttribute("class", "uv_welp");
                        UVC.textContent = "UV-Index: " + uv_index;
                    } else {
                        UVC.setAttribute("class", "uv_uhoh");
                        UVC.textContent = "UV-Index: " + uv_index;
                    }

                    console.log("OpenWeather 5-day Forecast\n-----------")
                    console.log(data);
                    
                    for (var i = 0; i < 6; i++) {
                        var date = data.daily[i].dt;
                        console.log(futureD[i]);
                        futureD[i].textContent = moment(new Date(date*1000), "MMM DD, YYYY").add(1, 'days').format("M/DD/YYYY");
                        wx_nextIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
                        Temps[i].textContent = "Temp: " + data.daily[i].temp.max + " F";
                        Winds[i].textContent = "Wind: " + data.daily[i].wind_speed + " mph";
                        Humids[i].textContent = "Humidity: " + data.daily[i].humidity + "%";
                        conds[i].textContent = "Conditions: " + data.daily[i].weather[0].description;
                        
                    }
                })



        })

}
fetchBtn.addEventListener('click', getApi);