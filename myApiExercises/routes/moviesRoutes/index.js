const express = require('express');
const route = express.Router();
const axios = require('axios');


route.get('/', async (req, res) => {
    res.send("Por favor, digite o nome do filme desejado na URL")
})
route.get('/:title', async (req, res) => {
    // I put key at url for test
    try {
        const url = `https://www.omdbapi.com/?apikey=${process.env.MOVIE_API_KEY || 'a6385ece'}&s=${req.params.title}&r=json&type=movie`
        const response = await axios.get(url);
        res.send(JSON.stringify(response.data.Search));
    } catch (error) {
        console.log(error);
        res.status(400).send(JSON.stringify({message: error.message}))
    }
});

module.exports = route;