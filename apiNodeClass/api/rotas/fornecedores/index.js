const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.send(JSON.stringify(resultados));
})

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();

    res.send(JSON.stringify(fornecedor));
})

roteador.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fornecedor = new Fornecedor({ id });
        await fornecedor.buscaFornecedor();
    
        res.send(JSON.stringify(fornecedor));    
    } catch (error) {
        console.log((error));
        res.send(JSON.stringify({message: error.message}));
    }
})

module.exports = roteador;