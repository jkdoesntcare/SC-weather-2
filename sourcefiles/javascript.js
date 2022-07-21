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

function displayTemperture(response) {
  let temperture = document.querySelector("#searchTemp");
  let city = document.querySelector("#searchCity");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let icon = document.querySelector("#icon");

  temperture.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  time.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute("src", `http://openweathermap.org/img/wn/10d@2x.png`);
}

let apiKey = "ee765fe52026bce2fd4a1b8bc1e42692";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperture);
