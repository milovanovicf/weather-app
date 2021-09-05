"use strict";

const weather = {
  apiKey: "f0c7d477002d6ff15e949932dd86e947",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(
      ".icon"
    ).src = `http://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".desc").innerText = `${description.toUpperCase()}`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity} %`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchbar").value);
  },
};

document.querySelector("button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".searchbar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
      document.querySelector(".weather").classList.remove("loading");
    }
  });
