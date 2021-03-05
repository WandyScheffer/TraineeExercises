const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const moviesRoutes = require('./moviesRoutes');
const gamesRoutes = require('./gamesRoutes');
const userRoutes = require('./userRoutes');

route.use(bodyParser.json());
route.use('/movies', moviesRoutes);
route.use('/games', gamesRoutes);
route.use('/users', userRoutes);

module.exports = route;