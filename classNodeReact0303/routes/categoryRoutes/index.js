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

// PRECISO CRIAR UMA ROTA QUE RETORNE TODAS AS CATEGORIAS ATIVAS
// COM OS SEUS PRODUTOS QUE CUSTAREM MAIS QUE 10
route.get('/active', CategoryController.getActive);

// Bonûs a partir daqui
// buscando categoria específica
route.get('/:id_or_name', CategoryController.getByIdOrName);




module.exports = route;