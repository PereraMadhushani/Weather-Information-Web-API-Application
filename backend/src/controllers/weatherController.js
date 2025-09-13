const fs = require('fs');
const path = require('path');
const {getWeather} = require('../services/weatherService');

const citiesPath = path.join(__dirname, '../data/cities.json');
let cities = [];
try{
  const data = fs.readFileSync(citiesPath, 'utf-8');
  const parsedData = JSON.parse(data);
  if(Array.isArray(parsedData)){
    cities = parsedData.map(city => 
      city.CityCode || city.CityName || city.Temp || city.Status
    ).filter(Boolean);
  } 
} catch(error){
  console.error('Error reading cities data:', error);
}

  const getCities = (req, res) => {
    res.json({count: cities.length, cityIds: cities});
  };

  const getCityWeather = async (req, res) => {
    const cityId = req.params;
    if(!cityId)
      return res.status(400).json({error: 'City ID is required'});
    try{
      const weatherData = await getWeather(cityId);
      res.json(weatherData);
    } catch(error){
      console.error('Error fetching weather data:', error);
      res.status(500).json({error: 'Failed to fetch weather data'});
    } 
  };

module.exports = {
  getCities,
  getCityWeather
};

