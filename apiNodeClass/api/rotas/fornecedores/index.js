const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.send(JSON.stringify(resultados));
})

roteador.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
    
        res.status(201).send(JSON.stringify(fornecedor));    
    } catch (error) {
        res.status(400).send(JSON.stringify({message: error.message}))
    }
})

roteador.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedor = new Fornecedor({ id });
        await fornecedor.buscaFornecedor();
        
        res.send(JSON.stringify(fornecedor));    
    } catch (error) {
        console.log((error));
        res.status(404).send(JSON.stringify({message: error.message}));
    }
})

roteador.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const dadosRecebidos = req.body;
    
        const dados = Object.assign({}, dadosRecebidos, { id });
        
        const fornecedor = new Fornecedor(dados);
    
        await fornecedor.atualizar();
        
        // console.log(dados);
        res.status(204).send();
        
    } catch (error) {
        next(error);
    }
    
})

roteador.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const fornecedor = new Fornecedor({id});
        await fornecedor.buscaFornecedor();
        await fornecedor.excluir();
        res.status(204).send()
    
    } catch (error) {
        res.status(404).send(JSON.stringify({message: error.message}))
    }
    
})

module.exports = roteador;