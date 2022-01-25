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
            var latLng = (lat + "_" + lng);
            placeButton(townState, latLng);
            howsTheWeather(townState, lat, lng);
        });
};

//get weather from One Call API
var howsTheWeather = function(townState, lat, lng) {
    var theAsk = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&units=imperial&appid=6422a136fb63b0c87dbf19f64b526f79");
    // var theAsk = ("https://api.openweathermap.org/data/2.5/onecall?lat=38.8683204&lon=-107.5920017&units=imperial&appid=6422a136fb63b0c87dbf19f64b526f79");
    fetch(theAsk)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        console.log(townState);
        console.log(data);
    });
};

//make buttons out of user requests
var placeButton = function (townState, latLng) {
    var papa = document.getElementById('somewhereFabulous');
    var bueller = document.getElementById('present');
    console.log(bueller);
    if (bueller === null) {
        var savedHeader = document.createElement("p");
        savedHeader.setAttribute("id", "present")
        savedHeader.textContent = "Or, these places seem to love you:"
        papa.appendChild(savedHeader);
    };
    var buttonL = document.createElement("button");
    buttonL.setAttribute("class", "place-button");
    buttonL.setAttribute("info", latLng);
    buttonL.textContent = townState;
    console.log(townState);
    console.log(latLng);
    papa.appendChild(buttonL);
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