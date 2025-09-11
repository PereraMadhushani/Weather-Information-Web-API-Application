const {getWeather, getCityIds} = require('../services/weatherService');

exports.getCityIds=()=>{
    return getCityIds();
};

exports.getWeather = async (cityId) => {
    return await getWeather(cityId);
};
