const express = require('express');
const route = express.Router();

const games = [];

route.get('/', (req, res) => {
    res.send(JSON.stringify(games));
})

route.post('/', (req, res) => {

    try {
        const {name, platform} = req.body;
        if (!name || !platform) throw new Error("Está faltando algum dos parâmetros")
        games.push({name, platform});
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({message: error.message}))
    }
});

module.exports = route;