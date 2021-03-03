const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { port } = require('config').get("api");

const route_fornecedores = require('./rotas/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado');

app.use(bodyParser.json());

app.use('/api/fornecedores', route_fornecedores);

app.use((erro, req, res, next) => {
    if (erro instanceof NaoEncontrado) {
        res.status(404);
    }else{
        res.status(400);
    }
    res.send(JSON.stringify({message: erro.message, id: erro.idErro}))
})

app.listen(port, () => console.log(`Running on port ${port}`));
