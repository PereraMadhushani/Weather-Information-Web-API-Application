const express = require('express');
const {getCities, getCityWeather} = require('../controllers/weatherController');
const {expressjwt} = require('../middleware/jwtMiddleware');
const jwkRsa = require('jwks-rsa');

const router = express.Router();

const jwtCheck = expressjwt({
    secret: jwkRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

router.get('/cities', getCities);
router.get('/weather/:city', jwtCheck, getCityWeather);

module.exports = router;    