const fs = require('fs');
const path = require('path');
const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/cities.json'), 'utf-8'));

function getCityIds(){
    return cities.map(city => city.CityCode ||city.CityName||city.Temp||city.Status).filter(Boolean);
}

async function fetchWeatherFromAPI(cityId) {
    const key =process.env.OPENWEATHER_KEY;
    const url =`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;
    const response = await axios.get(url);
    return response.data;
}

async function getWeather(cityId) {
    const cachedData = cache.get(cityId);
    if (cachedData) 
        return cachedData;

    const data = await fetchWeatherFromAPI(cityId);

    const result={
        id:cityId,
        name:data.name,
        description:data.weather[0].description,
        tempK: data.main.temp,
        tempC :data.main?.temp ? +(data.main.temp - 273.15).toFixed(2) : null
    };

    cache.set(cityId, result);
    return result;
}

module.exports = {
    getCityIds,
    getWeather
};