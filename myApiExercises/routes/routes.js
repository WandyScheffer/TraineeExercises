const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const moviesRoutes = require('./moviesRoutes');

route.use(bodyParser.json());
route.use('/movies', moviesRoutes);

module.exports = route;