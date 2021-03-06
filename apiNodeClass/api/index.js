const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { port } = require('config').get("api");

const route_fornecedores = require('./rotas/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const { SerializadorErro, acceptedFormats } = require('./Serializador');

app.use(bodyParser.json());
app.use((req, res, next) => {
    let requestedFormat = req.header('Accept');

    if (requestedFormat === '*/*') {
        requestedFormat = 'application/json';
    }

    if (!(acceptedFormats.some(item => item===requestedFormat))) {
        res.status(406).end();
        return;
        // console.log('formato inválido: '+requestedFormat);
    }
    res.setHeader('Content-Type', requestedFormat);
    next();
})

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
    
    const serializador = new SerializadorErro(
        res.getHeader('Content-Type') 
    )
    

    retorno = serializador.serializar({message: erro.message, id: erro.idErro})
    res.status(status).send(retorno);
})

app.listen(port, () => console.log(`Running on port ${port}`));
