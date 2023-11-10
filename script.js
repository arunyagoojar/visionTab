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

function updateDateTime() {
  var now = new Date();
  var options = { weekday: 'long', day: 'numeric', month: 'long' };
  var date = now.toLocaleDateString('en-US', options);
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');

  document.getElementById('date').textContent = date;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
}

setInterval(updateDateTime, 10);

const apiKey = '2edf3963535988a0c1d73395421e6674';

let temperatureElement = document.getElementById('temperature');
let descriptionElement = document.getElementById('description');

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let storedData = localStorage.getItem('weatherData');
  let weatherData = storedData ? JSON.parse(storedData) : null;

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
// Greet
let greetingElement = document.getElementById('greeting');

let date = new Date();
let hours = date.getHours();

let greeting;
let className;

if (hours < 12) {
  greeting = 'Good Morning';
  className = 'morning';
} else if (hours < 18) {
  greeting = 'Good Afternoon';
  className = 'afternoon';
} else {
  greeting = 'Good Evening';
  className = 'evening';
}

let name = localStorage.getItem('name');

if (!name) {
  name = prompt('Please enter your name:');
  localStorage.setItem('name', name);
}

greeting += ' ' + name + '.';

greetingElement.innerHTML = greeting;
greetingElement.className = className;


//bg

if (localStorage.getItem('bgImage')) {
  document.body.style.backgroundImage = 'url(' + localStorage.getItem('bgImage') + ')';
}

document.getElementById('uploadButton').addEventListener('click', function () {
  document.getElementById('imageUpload').click();
});

document.getElementById('imageUpload').addEventListener('change', function (e) {
  var file = e.target.files[0];

  if (file.size > 2 * 1024 * 1024) {
    alert("The file size should not exceed 2MB.");
    return;
  }

  var reader = new FileReader();

  reader.onloadend = function () {
    var base64data = reader.result;
    document.body.style.backgroundImage = 'url(' + base64data + ')';
    localStorage.setItem('bgImage', base64data);
  }

  if (file) {
    reader.readAsDataURL(file);
  }
});

//bookmark
chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
  displayBookmarks(bookmarkTreeNodes);
});

function displayBookmarks(bookmarkNodes) {
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    createBookmark(bookmarkNodes[i]);
  }
}

function createBookmark(bookmarkNode) {
  if (bookmarkNode.url) {
    var div = document.createElement('div');
    div.style.textAlign = 'center';

    var img = document.createElement('img');
    img.src = 'http://www.google.com/s2/favicons?domain=' + new URL(bookmarkNode.url).hostname;
    img.style.display = 'block';
    img.style.margin = '0 auto';
    div.appendChild(img);

    var a = document.createElement('a');
    a.href = bookmarkNode.url;
    a.textContent = bookmarkNode.title.replace(/[^\w\s]/gi, '').split(' ')[0]; // Remove symbols and get the first word of the title
    a.target = '_blank';
    div.appendChild(a);

    document.getElementById('bookmarksList').appendChild(div);
  }

  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    displayBookmarks(bookmarkNode.children);
  }
}