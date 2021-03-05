const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const { SerializadorFornecedor } = require('../../Serializador');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
    res.send(serializador.serializar(resultados));
})

roteador.post('/', async (req, res, next) => {
    try {
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();

        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));

        res.status(201).send(serializador.serializar(fornecedor));
    } catch (error) {
        next(error);
    }
})

roteador.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const fornecedor = new Fornecedor({ id });
        await fornecedor.buscaFornecedor();
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
        res.send(serializador.serializar(fornecedor));    
    } catch (error) {
        next(error)
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

roteador.delete('/:id', async (req, res, next) => {
    try {

        const { id } = req.params;
        const fornecedor = new Fornecedor({id});
        await fornecedor.buscaFornecedor();
        await fornecedor.excluir();
        res.status(204).send()
    
    } catch (error) {
        next(error)
    }
    
})

module.exports = roteador;