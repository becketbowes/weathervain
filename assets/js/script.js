var whereInTheWorld = function(param) {
    var theAsk = ("https://maps.googleapis.com/maps/api/geocode/json?address=" + param + "&key=AIzaSyDWtVKZCyc6X5L_eERu0Bk_WpclnefusjU")
    fetch(theAsk)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data.results[0].address_components[0].long_name);
            console.log(data.results[0].address_components[2].short_name);
            console.log(data.results[0].geometry.location);
        });
};


document.getElementById("btn").addEventListener("click", function() {
    var placeSearchName = document.getElementById("textarea").value;
    const words = placeSearchName.split(' ');
    if (words.length>1) {
        const string = (words[0] + "_" + words[1]);
        whereInTheWorld(string);
    } else {
        whereInTheWorld(placeSearchName);
    };
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