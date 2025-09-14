const fs = require('fs');
const path = require('path');
const {getWeather} = require('../services/weatherService');

const citiesPath = path.join(__dirname, '../data/cities.json');
let cities = [];
try{
  const data = fs.readFileSync(citiesPath, 'utf-8');
  cities = JSON.parse(data); 
} catch(error){
  console.error('Error reading cities data:', error);
}

  const getCities = (req, res) => {
    res.json({count: cities.length, cities});
  };

  const getCityWeather = async (req, res) => {
    const {cityId,mode} = req.query;
    if(!cityId)
      return res.status(400).json({error: 'City ID is required'});
     try {
    const data = await getWeather(cityId);

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
  getCities,
  getCityWeather
};

