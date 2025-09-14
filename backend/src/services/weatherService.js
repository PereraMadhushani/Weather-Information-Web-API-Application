const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env

// Get the API key from environment variables
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Base URL for the OpenWeatherMap API
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetches detailed weather data for a given city ID.
 * @param {string} cityId The unique ID of the city.
 * @returns {Promise<Object>} A promise that resolves to the weather data.
 */
const fetchWeather = async (cityId) => {
  // Check if the API key is available
  if (!OPENWEATHER_API_KEY) {
    throw new Error('API key is not defined. Please set the OPENWEATHER_API_KEY environment variable.');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        id: cityId,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });

    // Extract the relevant data from the API response
    const data = response.data;
    console.log('API response data:', data); // Log the entire response data for debugging
    return {
      id: data.id,
      name: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      temp: data.main.temp,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      icon: data.weather[0].icon,
      timezone: data.timezone,
      dt: data.dt,
    };
  } catch (error) {
    // Log a detailed error message, including the response data if available
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(`API call failed with status ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('No response received from the API. Check your network connection.');
    } else {
      console.error('Request Setup Error:', error.message);
      throw new Error('Error setting up the API request.');
    }
  }
};

module.exports = {
  fetchWeather,
};
