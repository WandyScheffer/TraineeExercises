const route = require('express').Router();
const ProductController = require('../../controllers/ProductController');


route.get('/', ProductController.listAll);
route.post('/', ProductController.create);
route.put('/:id', ProductController.edit);
route.delete('/:id', ProductController.exclude);


route.get('/:id_or_name', ProductController.getByIdOrName);

module.exports = route;