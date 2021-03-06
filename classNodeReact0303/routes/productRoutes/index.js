const route = require('express').Router();

route.get('/', (req, res) => res.send('listagem de produtos'));

module.exports = route;