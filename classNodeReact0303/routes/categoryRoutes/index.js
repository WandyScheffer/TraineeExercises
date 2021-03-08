const route = require('express').Router();
const CategoryController = require('../../controllers/CategoryController');


route.get('/', CategoryController.listAll);
route.post('/', CategoryController.create);
route.put('/:id', CategoryController.edit);
route.delete('/:id', CategoryController.exclude);


route.get('/active', CategoryController.getActive);

route.get('/:id_or_name', CategoryController.getByIdOrName);




module.exports = route;