// WeatherContainer.js
import React, { useState } from "react";
import "./WeatherContainer.css";

const WeatherContainer = () => {
  const [weatherData, setWeatherData] = useState({});
  const apiKey = "d70bb440c0379500187a0bd200838cbc";

  const getWeather = () => {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value;

    if (city.trim() === "") {
      alert("Please enter a city");
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData({
          error: "Failed to fetch weather data. Please try again.",
        });
      });
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="addd"></div>
      <div className="search-container">
        <input type="text" id="cityInput" placeholder="Enter city" />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      <div className="weather-info">
        {weatherData.error ? (
          <p>{weatherData.error}</p>
        ) : (
          <>
            <p className="temperature">{weatherData.main?.temp}°C</p>
            <p>{weatherData.weather?.[0]?.description}</p>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather?.[0]?.icon}.png`}
              alt={weatherData.weather?.[0]?.description}
              className="icon"
            />
            <p>Weather in {weatherData.name}</p>
            <img
              src="https://imgs.search.brave.com/pCjVAvzoymVrJa9hZNw0i-XGlsrkIHkwnvi3l0tKA4c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/d3VuZGVyZ3JvdW5k/LmNvbS9zdGF0aWMv/aS9jL3Y0LzE0LnN2/Zw.svg"
              alt="Weather Logo"
              className="logo"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherContainer;
