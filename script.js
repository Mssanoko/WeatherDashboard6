//Value of the input
var city = $("#searchValue").val();

//Api Key 
const apiKey = "&appid=e5d49d791f7868e4c7703b8e068cc7f8";

var date = new Date();

$("#searchValue").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});

$("#searchBtn").on("click", function() {

    $('#forecastDay5').addClass('show');

//Value of the input from the user 
city = $("searchValue").val();

//Clear input box
$("searchValue").val("");

//url for API 
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

//Ajax 
$.ajax({
    url: queryURL,
    method: "GET"
})
//when you get a response, run this callback 
.then(function(response){
    console.log(response)
})
getCurrentConditions(response);
getCurrentForecast(response);
makeList();

// get and set the content 
const card = $("<div>").addClass("card");
const cardBody = $("<div>").addClass("card-body");
const city = $("<h4>").addClass("card-title").text(response.name);
const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
