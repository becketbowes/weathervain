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

        //current weather report
        var nowWeather = (data.current.weather[0].description);
        var nowTemp = (data.current.temp);
        var nowTempFeels = (data.current.feels_like);
        var nowHumidity = (data.current.humidity);
        var nowWind = (data.current.wind_speed);
        var nowUv = (data.current.uvi);
        var nowWeatherCode = (data.current.weather[0].icon);
        var weatherHeadline = ("It's " + nowWeather + " in " + townState);
        var weatherLede = ("The temp is " + nowTemp + " farenheight, but it definitely feels like " + nowTempFeels + ". The humidity is only " + nowHumidity + ", and the wind is blowing at a mild " + nowWind + ". You should definitely moisturize. Not that you need it. Also, the UV is " + nowUv + ", which feels like this color: ");

        // date fixing function
            var fixDate = function(day) {
                var dt = (day * 1000);
                const dateObject = new Date(dt);
                const todayLong = dateObject.toLocaleString()
                const tossHours = todayLong.split(',');
                var day = tossHours[0];
                return day;
            };

        //Today's Weather report    
        var today = fixDate(data.daily[0].dt);
        var todayHigh = (data.daily[0].temp.max);
        var todayLow = (data.daily[0].temp.min);
        var todayWind = (data.daily[0].wind_speed);
        var todayHumid = (data.daily[0].humidity);
        var todayWeather = (data.daily[0].weather[0].main);
        var todayReport = (today + "<br/>" + todayWeather + " today, with a high of " + todayHigh + ", and a low of " + todayLow + ". The wind will be around " + todayWind + "mph, and humidity will be around " + todayHumid + "%. But we all know you'll bring your own weather anyway;)") 
        var todayIcon = (data.daily[0].weather[0].icon);

        //5 day forecast
        //dayplusone    
        var dayOne = fixDate(data.daily[1].dt);
        var dayOneHigh = (data.daily[1].temp.max);
        var dayOneLow = (data.daily[1].temp.min);
        var dayOneWind = (data.daily[1].wind_speed);
        var dayOneHumid = (data.daily[1].humidity);
        var dayOneWeather = (data.daily[1].weather[0].main);
        var dayOneReport = (dayOne + "<br/>" + dayOneWeather + " today, with a high of " + dayOneHigh + ", and a low of " + dayOneLow + ". The wind will be around " + dayOneWind + "mph, and humidity will be around " + dayOneHumid + "%. But we all know you'll bring your own weather anyway;)") 
        var dayOneIcon = (data.daily[1].weather[0].icon);
        
        //dayplustwo    
        var dayTwo = fixDate(data.daily[2].dt);
        var dayTwoHigh = (data.daily[2].temp.max);
        var dayTwoLow = (data.daily[2].temp.min);
        var dayTwoWind = (data.daily[2].wind_speed);
        var dayTwoHumid = (data.daily[2].humidity);
        var dayTwoWeather = (data.daily[2].weather[0].main);
        var dayTwoReport = (dayTwo + "<br/>" + dayTwoWeather + " today, with a high of " + dayTwoHigh + ", and a low of " + dayTwoLow + ". The wind will be around " + dayTwoWind + "mph, and humidity will be around " + dayTwoHumid + "%. But we all know you'll bring your own weather anyway;)") 
        var dayTwoIcon = (data.daily[2].weather[0].icon);

        //dayplusthree    
        var dayThree = fixDate(data.daily[3].dt);
        var dayThreeHigh = (data.daily[3].temp.max);
        var dayThreeLow = (data.daily[3].temp.min);
        var dayThreeWind = (data.daily[3].wind_speed);
        var dayThreeHumid = (data.daily[3].humidity);
        var dayThreeWeather = (data.daily[3].weather[0].main);
        var dayThreeReport = (dayThree + "<br/>" + dayThreeWeather + " today, with a high of " + dayThreeHigh + ", and a low of " + dayThreeLow + ". The wind will be around " + dayThreeWind + "mph, and humidity will be around " + dayThreeHumid + "%. But we all know you'll bring your own weather anyway;)") 
        var dayThreeIcon = (data.daily[3].weather[0].icon);

        //dayplusfour    
        var dayFour = fixDate(data.daily[4].dt);
        var dayFourHigh = (data.daily[4].temp.max);
        var dayFourLow = (data.daily[4].temp.min);
        var dayFourWind = (data.daily[4].wind_speed);
        var dayFourHumid = (data.daily[4].humidity);
        var dayFourWeather = (data.daily[4].weather[0].main);
        var dayFourReport = (dayFour + "<br/>" + dayFourWeather + " today, with a high of " + dayFourHigh + ", and a low of " + dayFourLow + ". The wind will be around " + dayFourWind + "mph, and humidity will be around " + dayFourHumid + "%. But we all know you'll bring your own weather anyway;)") 
        var dayFourIcon = (data.daily[4].weather[0].icon);

        //dayplusfive
        var dayFive = fixDate(data.daily[5].dt);
        var dayFiveHigh = (data.daily[5].temp.max);
        var dayFiveLow = (data.daily[5].temp.min);
        var dayFiveWind = (data.daily[5].wind_speed);
        var dayFiveHumid = (data.daily[5].humidity);
        var dayFiveWeather = (data.daily[5].weather[0].main);
        var dayFiveReport = (dayFive + "<br/>" + dayFiveWeather + " today, with a high of " + dayFiveHigh + ", and a low of " + dayFiveLow + ". The wind will be around " + dayFiveWind + "mph, and humidity will be around " + dayFiveHumid + "%. But we all know you'll bring your own weather anyway;)") 
        var dayFiveIcon = (data.daily[5].weather[0].icon);

        //console.log the values to return:
        console.log(todayReport, todayIcon);
        console.log(dayOneReport, dayOneIcon);
        console.log(dayTwoReport, dayTwoIcon);
        console.log(dayThreeReport, dayThreeIcon);
        console.log(dayFourReport, dayFourIcon);
        console.log(dayFiveReport, dayFiveIcon);
        console.log(weatherHeadline);
        console.log(weatherLede);
        console.log(nowWeatherCode);
        // color code uv index 
        console.log(nowUv);
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