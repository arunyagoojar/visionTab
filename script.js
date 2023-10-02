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
setInterval(updateDateTime, 1000);


