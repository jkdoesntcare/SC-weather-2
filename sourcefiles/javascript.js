function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  let days = ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col">
              <div class="forecastDay">${day}</div>
              <img src="images/sun.png" id="forecast-img" width="50px"/>
              <div class="forecast-tempertures">
              <span class="forecast-max-temp">
                18°
              </span>
            <span class="forecast-min-temp">
                12°
              </span>
              </div>
            </div>
          `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperture(response) {
  let temperture = document.querySelector("#searchTemp");
  let city = document.querySelector("#searchCity");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let time = document.querySelector("#time");
  let icon = document.querySelector("#icon");

  celsiTemp = response.data.main.temp;

  temperture.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  description.innerHTML = response.data.weather[0].description;
  time.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "ee765fe52026bce2fd4a1b8bc1e42692";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperture);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput");
  search(city.value);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

function showFarenTemp(event) {
  event.preventDefault();
  let farenTemp = (celsiTemp * 9) / 5 + 32;
  let temperture = document.querySelector("#searchTemp");
  temperture.innerHTML = Math.round(farenTemp);
}

function showCelsiTemp(event) {
  event.preventDefault();
  let celsiTemperture = document.querySelector("#searchTemp");
  celsiTemperture.innerHTML = Math.round(celsiTemp);
}

let faren = document.querySelector("#faren");
faren.addEventListener("click", showFarenTemp);

let celsi = document.querySelector("#celsi");
celsi.addEventListener("click", showCelsiTemp);

let celsiTemp = null;

search("New York");
displayForecast();
