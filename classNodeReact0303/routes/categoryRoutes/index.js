const route = require('express').Router();
const CategoryController = require('../../controllers/CategoryController');

// listagem de categorias
route.get('/', CategoryController.listAll);

// inserção de categoria
route.post('/', CategoryController.create);

// edição de categoria, desativando ou ativando, nome
route.put('/:id', CategoryController.edit);

// exclusão de categoria
route.delete('/:id', CategoryController.exclude);


// Bonûs a partir daqui
// buscando categoria específica
route.get('/:id_or_name', CategoryController.getByIdOrName);

// buscando categoria por nome
// route.get('/:name', CategoryController.getByIdOrName);

module.exports = route;