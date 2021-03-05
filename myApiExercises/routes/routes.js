const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const moviesRoutes = require('./moviesRoutes');
const gamesRoutes = require('./gamesRoutes');
const userRoutes = require('./userRoutes');
const { acceptedFormats } = require('./Serializador');

route.use(bodyParser.json());

route.use((req, res, next) => {
    let requestedFormat = req.header('Accept');

    if (requestedFormat === '*/*') {
        requestedFormat = 'application/json';
    }

    if (!(acceptedFormats.some(item => item===requestedFormat))) {
        res.status(406).end();
        return;
        // console.log('formato inválido: '+requestedFormat);
    }
    res.setHeader('Content-Type', requestedFormat);
    next();
});

route.use('/movies', moviesRoutes);
route.use('/games', gamesRoutes);
route.use('/users', userRoutes);

module.exports = route;