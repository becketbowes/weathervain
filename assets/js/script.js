//get latitude and longitude from user request
var whereInTheWorld = function(param) {
    var theAsk = ("https://maps.googleapis.com/maps/api/geocode/json?address=" + param + "&key=AIzaSyDWtVKZCyc6X5L_eERu0Bk_WpclnefusjU")
    fetch(theAsk)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //error function feat. Goldblum
            if (!data || data.status === 'ZERO_RESULTS') {
                var goldblum = document.getElementById('main-gif');
                var what = document.getElementById('headline');
                var areYouSaying = document.getElementById('lede');
                goldblum.style.backgroundImage = "url(assets/img/what.gif)";
                what.textContent = "Well, I just don't get it!";
                areYouSaying.textContent = "You're beautful, but you've gotta, you know, well, describe a city in three words or less, okay babe?";
            }
            //format the data, baby
            var town = (data.results[0].address_components[0].long_name);
            var state = (data.results[0].address_components[2].short_name);
            var lat = (data.results[0].geometry.location.lat);
            var lng = (data.results[0].geometry.location.lng);
            var townState = (town + ", " + state);
            placeButton(townState, lat, lng);
            howsTheWeather(townState, lat, lng);
        });
};

//get weather from One Call API
var howsTheWeather = function(townState, lat, lng) {
    var theAsk = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&units=imperial&appid=6422a136fb63b0c87dbf19f64b526f79");
    fetch(theAsk)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        console.log(townState);
        console.log(data);
        // var nowWeather = (data.current.weather[0].description);
        // var nowWeatherCode = (data.current.weather[0].icon);
        // var nowTemp = (data.current.temp);
        // var nowTempFeels = (data.current.feels_like);
        // var nowHumidity = (data.current.humidity);
        // var nowWind = (data.current.wind_speed);
        // var nowUv = (data.current.uvi);
        //color code uv index 
        // console.log(data.daily[0].dt); 
        // var dt = ((data.daily[0].dt) * 1000);
        // const dateObject = new Date(dt);
        // const todayLong = dateObject.toLocaleString()
        // const tossHours = todayLong.split(',');
        // const today = tossHours[0];
        // console.log(today);
            var fixDate = function(day) {
                var dt = (day * 1000);
                const dateObject = new Date(dt);
                const todayLong = dateObject.toLocaleString()
                const tossHours = todayLong.split(',');
                var day = tossHours[0];
                return day;
            }
        var today = fixDate(data.daily[0].dt);
        console.log(today);
        // console.log("Today: " + day)
        // console.log("Today: " + weather);
        // console.log("Today: " + temp high, temp low, wind-spped and humidity)
    

        // console.log("Tomorrow: " +);
        // console.log("The next day: " +);
        // console.log("The Day After Tomorrow (dun dun): " +);
        // console.log("Four days from now" +);
        // console.log("Who are they kidding, pretending to know anything about five days from now?! " +)
    });
};

// codes for weather:
// 200 = thunderstorm
// 300 = drizzle
// 500 = rain
// 600 = snow
// 700 = atmosphere
// 800 - 804 clear to cloudy spectrum


//make buttons out of user requests
var placeButton = function (townState, lat, lng) {
    var papa = document.getElementById('somewhereFabulous');
    var bueller = document.getElementById('present');
    if (bueller === null) {
        var savedHeader = document.createElement("p");
        savedHeader.setAttribute("id", "present")
        savedHeader.textContent = "Or, these places seem to love you:"
        papa.appendChild(savedHeader);
    };
    var buttonL = document.createElement("button");
    buttonL.setAttribute("class", "place-button");
    buttonL.setAttribute("info", lat, lng);
    buttonL.textContent = townState;
    console.log(townState);
    papa.appendChild(buttonL);
    buttonL.addEventListener('click', function(townState, lat, lng) {
        howsTheWeather(townState, lat, lng);
    })
};

//clear text area
var clearText = function() {
    document.getElementById('textarea').value = "";
}

//get user request and format it for google geocode service
document.getElementById("btn").addEventListener("click", function () {
    var placeSearchName = document.getElementById("textarea").value;
    const words = placeSearchName.split(' ');
    if (words.length > 1) {
        const string = (words[0] + "_" + words[1]);
        whereInTheWorld(string);
    } else if (words.length > 2) {
        const string = (words[0] + "_" + words[1] + "_" + words[2]);
        whereInTheWorld(string);
    } else {
        whereInTheWorld(placeSearchName);
    };
    clearText();
});


// var lookOutTheWindow = function() {

// }

// whereInTheWorld(text))
// google locator api key : AIzaSyDWtVKZCyc6X5L_eERu0Bk_WpclnefusjU


//design layout
//create search field
//return seach to local storage/ new div
//make saved divs active searches
//script req to server
//return current weather to main field
//weather, temp, humidity, windspeed, UV index
//color code UV
//return five day forcast to cards
//add icons to forcast