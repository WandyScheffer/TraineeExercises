const route = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');


route.use('/categorys', categoryRoutes);
route.use('/products', productRoutes);

module.exports = route;