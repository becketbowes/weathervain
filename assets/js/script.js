// //make weather data variables global
// var nowWeather = "";
// var nowTemp = "";
// var nowTempFeels = "";
// var nowHumidity = "";
// var nowWind = "";
// var nowUv = "";
// var nowWeatherCode = "";
// var weatherHeadline = "";
// var weatherLede = "";
// //Today's Weather report    
// var today = "";
// var todayHigh = "";
// var todayLow = "";
// var todayWind = "";
// var todayHumid = "";
// var todayWeather = "";
// var todayReport = "";
// //5 day forecast
// //dayplusone    
// var dayOne = "";
// var dayOneHigh = "";
// var dayOneLow = "";
// var dayOneWind = "";
// var dayOneHumid = "";
// var dayOneWeather = "";
// var dayOneReport = "";
// var dayOneIcon = "";
// //dayplustwo    
// var dayTwo = "";
// var dayTwoHigh = "";
// var dayTwoLow = "";
// var dayTwoWind = "";
// var dayTwoHumid = "";
// var dayTwoWeather = "";
// var dayTwoReport = "";
// var dayTwoIcon = "";
// //dayplusthree    
// var dayThree = "";
// var dayThreeHigh = "";
// var dayThreeLow = "";
// var dayThreeWind = "";
// var dayThreeHumid = "";
// var dayThreeWeather = "";
// var dayThreeReport = "";
// var dayThreeIcon = "";
// //dayplusfour    
// var dayFour = "";
// var dayFourHigh = "";
// var dayFourLow = "";
// var dayFourWind = "";
// var dayFourHumid = "";
// var dayFourWeather = "";
// var dayFourReport = "";
// var dayFourIcon = "";
// //dayplusfive
// var dayFive = "";
// var dayFiveHigh = "";
// var dayFiveLow = "";
// var dayFiveWind = "";
// var dayFiveHumid = "";
// var dayFiveWeather = "";
// var dayFiveReport = "";
// var dayFiveIcon = "";

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
        var weatherLede = ("The temp is " + nowTemp + " farenheight, but it definitely feels like " + nowTempFeels + ". The humidity is, like, " + nowHumidity + "%, and the wind is blowing at a mild and/or whopping " + nowWind + "mph. You should definitely moisturize, though anyhow. Not that you need it. Also, babe, just for reference: moderate UV indexes are, like, 3-5. Right now the UV is " + nowUv + ", which in terms of, say, stop lights, feels like this color: ");

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
        var todayReport = (todayWeather + " in general today, with a high of " + todayHigh + ", and a low of " + todayLow + ". The wind will be around " + todayWind + "mph, and humidity will be around " + todayHumid + "%. Dress like you own it, because you DO!"); 
        console.log(todayReport);

        //5 day forecast
        //dayplusone    
        var dayOne = fixDate(data.daily[1].dt);
        var dayOneHigh = (data.daily[1].temp.max);
        var dayOneLow = (data.daily[1].temp.min);
        var dayOneWind = (data.daily[1].wind_speed);
        var dayOneHumid = (data.daily[1].humidity);
        var dayOneWeather = (data.daily[1].weather[0].main);
        var dayOneReport = (dayOne + "<br/>" + dayOneWeather + " today, with a high of " + dayOneHigh + ", and a low of " + dayOneLow + ". The wind will be around " + dayOneWind + "mph, and humidity will be around " + dayOneHumid + "%. You know you're aging like fine wine, babe. Tomorrow you just be that much better. "); 
        var dayOneIcon = (data.daily[1].weather[0].icon);
        
        //dayplustwo    
        var dayTwo = fixDate(data.daily[2].dt);
        var dayTwoHigh = (data.daily[2].temp.max);
        var dayTwoLow = (data.daily[2].temp.min);
        var dayTwoWind = (data.daily[2].wind_speed);
        var dayTwoHumid = (data.daily[2].humidity);
        var dayTwoWeather = (data.daily[2].weather[0].main);
        var dayTwoReport = (dayTwo + "<br/>" + dayTwoWeather + " today, with a high of " + dayTwoHigh + ", and a low of " + dayTwoLow + ". The wind will be around " + dayTwoWind + "mph, and humidity will be around " + dayTwoHumid + "%. I'd say that this weather is the most flattering for you, but holy hell, look at you Right Now. In this weather! Killing it."); 
        var dayTwoIcon = (data.daily[2].weather[0].icon);

        //dayplusthree    
        var dayThree = fixDate(data.daily[3].dt);
        var dayThreeHigh = (data.daily[3].temp.max);
        var dayThreeLow = (data.daily[3].temp.min);
        var dayThreeWind = (data.daily[3].wind_speed);
        var dayThreeHumid = (data.daily[3].humidity);
        var dayThreeWeather = (data.daily[3].weather[0].main);
        var dayThreeReport = (dayThree + "<br/>" + dayThreeWeather + " today, with a high of " + dayThreeHigh + ", and a low of " + dayThreeLow + ". The wind will be around " + dayThreeWind + "mph, and humidity will be around " + dayThreeHumid + "%. Make some plans around it babe, because you'll feel that much more glam when you cancel."); 
        var dayThreeIcon = (data.daily[3].weather[0].icon);

        //dayplusfour    
        var dayFour = fixDate(data.daily[4].dt);
        var dayFourHigh = (data.daily[4].temp.max);
        var dayFourLow = (data.daily[4].temp.min);
        var dayFourWind = (data.daily[4].wind_speed);
        var dayFourHumid = (data.daily[4].humidity);
        var dayFourWeather = (data.daily[4].weather[0].main);
        var dayFourReport = (dayFour + "<br/>" + dayFourWeather + " today, with a high of " + dayFourHigh + ", and a low of " + dayFourLow + ". The wind will be around " + dayFourWind + "mph, and humidity will be around " + dayFourHumid + "%. So, is the question which hat or what hair!?"); 
        var dayFourIcon = (data.daily[4].weather[0].icon);

        //dayplusfive
        var dayFive = fixDate(data.daily[5].dt);
        var dayFiveHigh = (data.daily[5].temp.max);
        var dayFiveLow = (data.daily[5].temp.min);
        var dayFiveWind = (data.daily[5].wind_speed);
        var dayFiveHumid = (data.daily[5].humidity);
        var dayFiveWeather = (data.daily[5].weather[0].main);
        var dayFiveReport = (dayFive + "<br/>" + dayFiveWeather + " today, with a high of " + dayFiveHigh + ", and a low of " + dayFiveLow + ". The wind will be around " + dayFiveWind + "mph, and humidity will be around " + dayFiveHumid + "%. Nobody really knows what the weather is like five days out, but don't worry, babe, you make your own weather anyway;)"); 
        var dayFiveIcon = (data.daily[5].weather[0].icon);

        //console.log the values to return:
        console.log(dayOneReport, dayOneIcon);
        console.log(dayTwoReport, dayTwoIcon);
        console.log(dayThreeReport, dayThreeIcon);
        console.log(dayFourReport, dayFourIcon);
        console.log(dayFiveReport, dayFiveIcon);

        nowCast(weatherHeadline, weatherLede, today, todayReport, nowWeatherCode, nowUv)
    });
};

//diplay current weather
var nowCast = function(weatherHeadline, weatherLede, today, todayReport, nowWeatherCode, nowUv) {
        var headline = document.getElementById("headline");
        var lede = document.getElementById("lede");
        var uv = document.getElementById("uv");
        var reportDay = document.getElementById("report-day");
        var date = document.getElementById("date");
        var report = document.getElementById("report");
        uv.classList.remove("hide");
        reportDay.classList.remove("hide");
        headline.textContent = weatherHeadline;
        lede.textContent = weatherLede;
        date.textContent = ("Today, " + today);
        report.textContent = todayReport;
        //color code Uv
        if (nowUv>6) {
            uv.setAttribute("style", "background-color:red");
        } else if (nowUv <= 6 && nowUv >= 3) {
            uv.setAttribute("style", "background-color:yellow");
        } else {
            uv.setAttribute("style", "background-color:green");
        };
        console.log(nowWeatherCode);
}

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