const route = require('express').Router();
const ProductController = require('../../controllers/ProductController');

// listagem de produtos, junto a categoria pertencente
route.get('/', ProductController.listAll);

// inserção de produto
route.post('/', ProductController.create);

// edição de produto, nome, preço, categoria
route.put('/:id', ProductController.edit);

// exclusão de produto
route.delete('/:id', ProductController.exclude);


// Bonûs a partir daqui
// buscando produto específica, mostrando a categoria
route.get('/:id', ProductController.getByIdOrName);

// buscando produto por nome, mostrando a categoria
route.get('/:name', ProductController.getByIdOrName);

module.exports = route;