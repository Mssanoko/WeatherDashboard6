//Value of the input
var city = $("#searchValue").val();

//Api Key 
const apiKey = "&appid=e5d49d791f7868e4c7703b8e068cc7f8";

var date = new Date();

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