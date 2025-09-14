const fs = require('fs');
const path = require('path');
const {fetchWeather} = require('../services/weatherService');

const citiesPath = path.join(__dirname, '../data/cities.json');
let cities = [];

try {
  // Read the cities.json file synchronously
  const data = fs.readFileSync(citiesPath, 'utf-8');
  // Parse the JSON data and assign the 'List' property to the cities array
  const parsedData = JSON.parse(data);
  cities = parsedData.List;
  // Log the number of cities loaded to confirm it's working
  console.log(`Successfully loaded ${cities.length} cities from cities.json.`);
} catch(error) {
  // If the file can't be read or parsed, log a clear error message
  console.error('Error reading cities data. Please ensure cities.json exists and is valid:', error.message);
}

// Controller function to get all cities with full weather details
const getAllCitiesWeatherDetails = async (req, res) => {
  try {
    // CRITICAL FIX: Check if the cities array is empty.
    // If the data failed to load from the file, return an error.
    if (cities.length === 0) {
      return res.status(500).json({ error: 'City data is not available. Please check the cities.json file.' });
    }

    // Create an array of promises for each API call
    const weatherPromises = cities.map(city => 
      // Call the service function to fetch detailed weather for each city code
      fetchWeather(city.CityCode)
    );

    // Wait for all API calls to complete
    const detailedWeatherData = await Promise.all(weatherPromises);

    // Combine the basic and detailed data
    const combinedData = cities.map((city, index) => {
      // Get the detailed data for the current city
      const detailed = detailedWeatherData[index];
      
      // Return a new object that merges both sets of data
      return {
        ...city, // Spread operator to include basic data
        CountryCode: detailed.country, // Add country code from API
        TempMin: detailed.temp_min,
        TempMax: detailed.temp_max,
        Pressure: detailed.pressure,
        Humidity: detailed.humidity,
        WindSpeed: detailed.wind_speed,
        WindDirection: detailed.wind_deg,
        Visibility: detailed.visibility,
        Sunrise: detailed.sunrise,
        Sunset: detailed.sunset,
        // Assuming your API response has a 'description' field
        Status: detailed.description, 
      };
    });

    res.json({ count: combinedData.length, cities: combinedData });
  } catch (error) {
    console.error('Error fetching all cities weather details:', error);
    res.status(500).json({ error: 'Failed to fetch detailed weather data' });
  }
};

const getCities = (req, res) => {
  res.json({count: cities.length, cities});
};

const getCityWeather = async (req, res) => {
  const {cityId,mode} = req.query;
  if(!cityId)
    return res.status(400).json({error: 'City ID is required'});
    try {
    const data = await fetchWeather(cityId);

    if (mode === 'basic') {
      return res.json({
        id: data.id,
        name: data.name,
        country: data.country,
        description: data.description,
        temp: data.temp
      });
    } 
    return res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({error: 'Failed to fetch weather data'});
  }
};

module.exports = {
  getCities: getAllCitiesWeatherDetails,
  getCityWeather
};