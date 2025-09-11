const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const weatherRoutes = require('./routes/weatherRoutes');


const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/weather', weatherRoutes);

module.exports = app;