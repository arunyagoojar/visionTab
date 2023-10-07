document.getElementById('search-input').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    let query = document.getElementById('search-input').value;
    window.location = 'https://www.google.com/search?q=' + query;
  }
});

document.getElementById('search-button').addEventListener('click', function () {
  let query = document.getElementById('search-input').value;
  window.location = 'https://www.google.com/search?q=' + query;
});

// Update date and time
function updateDateTime() {
  var now = new Date();
  var options = { weekday: 'long', day: 'numeric', month: 'long' };
  var date = now.toLocaleDateString('en-US', options);
  var hours = now.getHours().toString().padStart(2, '0'); // pad hours with leading zero if needed
  var minutes = now.getMinutes().toString().padStart(2, '0'); // pad minutes with leading zero if needed

  document.getElementById('date').textContent = date;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
}

// Update date and time every second
setInterval(updateDateTime, 10);

//weather
const apiKey = '2edf3963535988a0c1d73395421e6674';

let temperatureElement = document.getElementById('temperature');
let descriptionElement = document.getElementById('description');

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let storedData = localStorage.getItem('weatherData');
  let weatherData = storedData ? JSON.parse(storedData) : null;

  // Check if data is more than an hour old
  if (weatherData && new Date().getTime() - weatherData.timestamp < 3600000) {
    displayWeather(weatherData.temperature, weatherData.description);
  } else {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        let temperature = Math.round(data.main.temp);
        let description = data.weather[0].main;

        // Save data to localStorage with timestamp
        localStorage.setItem('weatherData', JSON.stringify({
          temperature: temperature,
          description: description,
          timestamp: new Date().getTime()
        }));

        displayWeather(temperature, description);
      });
  }
}

function error() {
  let storedData = localStorage.getItem('weatherData');
  let weatherData = storedData ? JSON.parse(storedData) : null;

  if (weatherData) {
    displayWeather(weatherData.temperature, weatherData.description);
  } else {
    temperatureElement.innerHTML = "Unable to retrieve temperature";
    descriptionElement.innerHTML = "Unable to retrieve weather";
  }
}

function displayWeather(temperature, description) {
  temperatureElement.innerHTML = ` ${temperature} &deg; C`;
  descriptionElement.innerHTML = `${description} , `;
}

// Greet
let greetingElement = document.getElementById('greeting');

let date = new Date();
let hours = date.getHours();

let greeting;
let className;

if (hours < 12) {
  greeting = 'Good Morning!';
  className = 'morning';
} else if (hours < 18) {
  greeting = 'Good Afternoon!';
  className = 'afternoon';
} else {
  greeting = 'Good Evening!';
  className = 'evening';
}

greetingElement.innerHTML = greeting;
greetingElement.className = className;
