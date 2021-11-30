/* This is a standalone weather animation javascript.

Takes in the local date in order to determine color of background(night and day gradient)
Toggle between weather types: clear, clouds, rain, snow.
  Clear shows a sun or moon to the left and slightly above the clock.
  Clouds shows a horizontal loop of clouds.
  Rain and Snow shows precipitation falling.
*/

//document data
const docHour = document.getElementById('hour');
const docMinute = document.getElementById('minute');

const docMonth = document.getElementById('month');
const docDay = document.getElementById('day');
const docYear = document.getElementById('year');

const clearButton = document.getElementById('clear');
const cloudsButton = document.getElementById('clouds');
const rainButton = document.getElementById('rain');
const snowButton = document.getElementById('snow');

const weatherBackground = document.getElementById('weatherBack');
const weatherForeground = document.getElementById('weatherFore');
const weatherObject = document.getElementById('skyObject');

//Changes a numerical representation of months into the appropriate word.
//takes an integer m, returns a string
function monthNumToString(m) {
  switch(m) {
    case 0: return "January";
    case 1: return "February";
    case 2: return "March";
    case 3: return "April";
    case 4: return "May";
    case 5: return "June";
    case 6: return "July";
    case 7: return "August";
    case 8: return "September";
    case 9: return "October";
    case 10: return "November";
    case 11: return "December";
  }
}

//Changes the hours of a 24 hour clock into the approriate hour for a 12 hour clock.
//takes an integer h, returns an integer
function hourTwelve(h) {
  if (h == 0) {
    return 12;
  } else if (h <= 12) {
    return h;
  } else {
    return h - 12;
  }
}

//Ensures that a number has at least 2 digits by putting a '0' in front of
//single digit numbers.
//takes an integer m, returns an integer
function minuteZero(m) {
  if (m < 10) {
    return "0"+ m;
  } else {
    return m;
  }
}

//Translates the date object into a time object and translates the information given
//into correct arrangements.
class time {
  constructor(d) {
    this.year = d.getFullYear(),
    this.month = monthNumToString(d.getMonth()),
    this.day = d.getDate() + ",",
    this.hour = hourTwelve(d.getHours()),
    this.minute = minuteZero(d.getMinutes());
  }
}

//color change based on time
//brightest at noon, darkest at midnight.
function colorChange() {
  let hslString = "";
  let h = new Date().getHours();
  let multiplier = 5.8;
  var l;

  if (h > 12) {
   l = ((((h - 12) * -1) + 12) * multiplier) + 10;
  } else {
   l = (h * multiplier) + 10;
  }

  hslString = "hsl(205, 70%, " + l + "%)";
  return hslString;
}

//make the document time equal the current time. Also updates the color background.
function refreshTime() {
  let curDate = new Date();
  let curTime = new time(curDate);

  docHour.innerHTML = curTime.hour;
  docMinute.innerHTML = curTime.minute;

  docMonth.innerHTML = curTime.month;
  docDay.innerHTML = curTime.day;
  docYear.innerHTML = curTime.year;

  document.body.style.backgroundColor = colorChange();
}

refreshTime(); //initiates the clock.

//refreshing the time, color every second
setInterval(refreshTime, 1000);





//Weather currently being shown
var weatherType = "none";

//takes in what button was clicked, and initiates animation and/or stops it.
function weatherCheck(str) {
  if (weatherType == str) {
    toNone();
    weatherType = "none";
  } else {
    weatherBackground.style.opacity = "1";
    weatherForeground.style.opacity = "1";
    weatherType = str;
    switch(str) {
      case "clear":
        toClear();
        break;
      case "clouds":
        toClouds();
        break;
      case "rain":
        toRain();
        break;
      case "snow":
        toSnow();
        break;
    }
  }
}

//What to do when a button is clicked.
function toNone() {
  console.log("stop");
  weatherBackground.style.opacity = "0";
  weatherForeground.style.opacity = "0";
  weatherBackground.style.backgroundImage = "none";
  weatherForeground.style.backgroundImage = "none";

  weatherObject.style.opacity = "0";
}
function toClear() {
  console.log("clear");

  weatherBackground.style.backgroundImage = "none";
  weatherForeground.style.backgroundImage = "none";

  weatherObject.style.opacity = "1";

  let tempDate = new Date().getHours();
  if (tempDate > 18 || tempDate <= 6) {
    weatherObject.style.backgroundImage = "url('Weather/Sun/Moon.png')";
  } else {
    weatherObject.style.backgroundImage = "url('Weather/Sun/Sun.png')";
  }
}
function toClouds() {
  console.log("clouds");
  weatherObject.style.opacity = "0";
  weatherBackground.style.backgroundSize = "3000px 1500px";
  weatherForeground.style.backgroundSize = "3000px 1500px";

  weatherBackground.style.animationName = "weatherAcross";
  weatherForeground.style.animationName = "weatherAcross";

  weatherBackground.style.animationDuration = "45s";
  weatherForeground.style.animationDuration = "20s";

  weatherBackground.style.backgroundImage = "url('Weather/Clouds/CloudsBackground.png')";
  weatherForeground.style.backgroundImage = "url('Weather/Clouds/CloudsForeground.png')";
}
function toRain() {
  console.log("rain");
  weatherObject.style.opacity = "0";
  weatherBackground.style.backgroundSize = "500px 500px";
  weatherForeground.style.backgroundSize = "500px 500px";

  weatherBackground.style.animationName = "weatherDown";
  weatherForeground.style.animationName = "weatherDown";

  weatherBackground.style.animationDuration = "1.2s";
  weatherForeground.style.animationDuration = ".4s";

  weatherBackground.style.backgroundImage = "url('Weather/Rain/RainBackground.png')";
  weatherForeground.style.backgroundImage = "url('Weather/Rain/RainForeground.png')";
}
function toSnow() {
  console.log("snow");
  weatherObject.style.opacity = "0";
  weatherBackground.style.backgroundSize = "500px 500px";
  weatherForeground.style.backgroundSize = "500px 500px";

  weatherBackground.style.animationName = "weatherDown";
  weatherForeground.style.animationName = "weatherDown";

  weatherBackground.style.animationDuration = "4s";
  weatherForeground.style.animationDuration = "2s";

  weatherBackground.style.backgroundImage = "url('Weather/Snow/SnowBackground.png')";
  weatherForeground.style.backgroundImage = "url('Weather/Snow/SnowForeground.png')";
}



//adding event listeners to weather buttons
//passes the appropriate string to the function 'weatherCheck'
clearButton.addEventListener("click", function() {
  weatherCheck("clear");
});
cloudsButton.addEventListener("click", function() {
  weatherCheck("clouds");
});
rainButton.addEventListener("click", function() {
  weatherCheck("rain");
});
snowButton.addEventListener("click", function() {
  weatherCheck("snow");
});
