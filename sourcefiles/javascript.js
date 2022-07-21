function displayTemperture(response) {
  console.log(response.data);
  let temperture = document.querySelector("#searchTemp");
  let city = document.querySelector("#searchCity");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  temperture.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
}

let apiKey = "ee765fe52026bce2fd4a1b8bc1e42692";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperture);
