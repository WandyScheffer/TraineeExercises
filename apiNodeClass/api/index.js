const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { port } = require('config').get("api");

const route_fornecedores = require('./rotas/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');

app.use(bodyParser.json());

app.use('/api/fornecedores', route_fornecedores);

app.use((erro, req, res, next) => {
    let status = 500;

    if (erro instanceof NaoEncontrado) {
        status = 404;
    }else if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos){
        status = 400;
    }else if(erro instanceof ValorNaoSuportado){
        status = 406;
    }
    res.status(status).send(JSON.stringify({message: erro.message, id: erro.idErro}))
})

app.listen(port, () => console.log(`Running on port ${port}`));
