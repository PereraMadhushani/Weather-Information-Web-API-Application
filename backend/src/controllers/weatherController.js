const fs = require('fs');
const path = require('path');
const {fetchWeather} = require('../services/weatherService');

const citiesPath = path.join(__dirname, '../data/cities.json');
let cities = [];

try {
  const data = fs.readFileSync(citiesPath, 'utf-8');
  const parsedData = JSON.parse(data);
  cities = parsedData.List;

  console.log(`Successfully loaded ${cities.length} cities from cities.json.`);

} catch(error) {
  console.error('Error reading cities data. Please ensure cities.json exists and is valid:', error.message);
}

const getAllCitiesWeatherDetails = async (req, res) => {
  try {
    if (cities.length === 0) {
      return res.status(500).json({ error: 'City data is not available. Please check the cities.json file.' });
    }

    // Create an array of promises for each API call
    const weatherPromises = cities.map(city => 
      fetchWeather(city.CityCode)
    );

    const detailedWeatherData = await Promise.all(weatherPromises);
    const combinedData = cities.map((city, index) => {
    const detailed = detailedWeatherData[index];
      
      return {
        ...city, 
        CountryCode: detailed.country,
        TempMin: detailed.temp_min,
        TempMax: detailed.temp_max,
        Pressure: detailed.pressure,
        Humidity: detailed.humidity,
        WindSpeed: detailed.wind_speed,
        WindDirection: detailed.wind_deg,
        Visibility: detailed.visibility,
        Sunrise: detailed.sunrise,
        Sunset: detailed.sunset,       
        Status: detailed.description,
        Icon: detailed.icon?? null, // Assuming your API response has an 'icon' field 
        Timezone: detailed.timezone,
        Dt: detailed.dt,
        Id: detailed.id
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
    const { cityCode } = req.params;
    const { mode } = req.query;

    if (!cityCode) {
        return res.status(400).json({ error: 'City Code is required' });
    }

    try {
        // Trim the cityCode to remove any extra whitespace or newline characters
        const trimmedCityCode = cityCode.trim();

        const data = await fetchWeather(trimmedCityCode);

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
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

module.exports = {
  getCities: getAllCitiesWeatherDetails,
  getCityWeather
};