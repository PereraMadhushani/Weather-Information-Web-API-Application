const axios = require("axios");
const cache = require("../cache/cache");

const fetchWeather = async (cityId) => {
  const cacheKey = `weather_${cityId}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  const data = response.data;

  const weatherData = {
    id: data.id,
    name: data.name,
    country: data.sys.country,
    description: data.weather[0].description,
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    visibility: (data.visibility / 1000) + " km",
    wind_speed: data.wind.speed,
    wind_deg: data.wind.deg,
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    timestamp: new Date(data.dt * 1000).toLocaleString()
  };

  cache.set(cacheKey, weatherData, 300);
  return weatherData;
};

module.exports = { fetchWeather };
