const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const moviesRoutes = require('./moviesRoutes');
const gamesRoutes = require('./gamesRoutes');

route.use(bodyParser.json());
route.use('/movies', moviesRoutes);
route.use('/games', gamesRoutes);

module.exports = route;