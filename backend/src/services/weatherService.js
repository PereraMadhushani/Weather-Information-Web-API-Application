const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cache = require('../utils/cache');

const API_KEY = process.env.OPENWEATHER_KEY;

// const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes
// const cities = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/cities.json'), 'utf-8'));

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
    const cachedKey = `weather:${cityId}`;
    const cachedData = cache.get(cachedKey);
    if (cachedData) {
        return { source: 'cache', data: cachedData };

        const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const body = response.data;
        const out ={
            id: body.id,
            name: body.name,
            temp: body.main.temp,
            description: body.weather[0].description
        };

        cache.set(cachedKey, out, 300); // Cache for 5 minutes
        return { source: 'api', data: out };
    }
}

module.exports = {
    getCityIds,
    getWeather
};