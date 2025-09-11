const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

//endpoints
router.get('/:cities', weatherController.getCities);
router.get('/:cityId', weatherController.getWeatherByCityId);

module.exports = router;