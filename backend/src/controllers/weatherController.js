const weatherModel = require('../models/weatherModel');

exports.getCities = async (req, res) => {
  try {
    const cities = weatherModel.getCityIds();
    res.json(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      res.status(500).json({ error: 'Error loading cities.' });

    }
};

exports.getWeatherByCityId = async (req, res) => {
  try {
    const cityId = req.params.cityId;
    const weatherData = await weatherModel.getWeather(cityId);
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error loading weather data.' });
  }
};
