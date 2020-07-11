// store the value of the input
let city = $("#searchvalue").val();
// store api key
const apiKey = "&appid=e5d49d791f7868e4c7703b8e068cc7f8";

var date = new Date();

$("#searchValue").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});

$("#searchBtn").on("click", function() {

  $('#forecastDay').addClass('show');

  // get the value from user
  city = $("#searchValue").val();
  
  // clear input box
  $("#searchValue").val("");  

  // url to call api
  const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){

    console.log(response)

    console.log(response.name)
    console.log(response.weather[0].icon)

    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    console.log(Math.floor(tempF))

    console.log(response.main.humidity)

    console.log(response.wind.speed)

    console.log(response.value)

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();

    })
  });

  function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }

  function getCurrentConditions (response) {

    // get the temperature and convert to fahrenheit 
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#chosenCity').empty();

    // set the content 
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
  

      //get UV Index
      var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=4cf30da31449bce012676ddeb2829c74&units=imperial&lat=" + response.coord.lat + "&lon=" + response.coord.lat;
      $.ajax({
          url: uvURL,
          method: "GET"
      })
      .then(function (uvresponse) {
          var uvIndex = uvresponse.value;
          var bgColor;
          if (uvIndex <= 3) {
              bgColor = "green";
          }
          else if ((uvIndex >=4) && (uvIndex <= 8)) {
              bgColor = "yellow";
          }
         
          else 
              bgColor = "red";
          
        var uvdisp = $("<p>").attr("class", "card-text").text("UV Index: ");
        uvdisp.append($("<span>").attr("class", "uvindex").attr("style", ("background-color:" + bgColor)).text(uvIndex));
        cardBody.append(uvdisp);

    });
      


    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#chosenCity").append(card)
   
  }

function getCurrentForecast () {
  
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response){

    console.log(response)
    console.log(response.dt)
    $('#forecast').empty();

    // hold response.list
    var results = response.list;
    console.log(results)
    
    // for loop for declare the date and end it.

    for (let i = 0; i < results.length; i++) {

      var day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
      var hour = results[i].dt_txt.split('-')[2].split(' ')[1];
      console.log(day);
      console.log(hour);

      if(results[i].dt_txt.indexOf("12:00:00") !== -1){
        
        // temperature convert to fahrenheit 
        var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
        var tempF = Math.floor(temp);

        const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
        const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
        const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

        const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);

      }
    }
  });

}