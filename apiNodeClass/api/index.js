const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { port } = require('config').get("api");

const route_fornecedores = require('./rotas/fornecedores');

app.use(bodyParser.json());

app.use('/api/fornecedores', route_fornecedores);

app.listen(port, () => console.log(`Running on port ${port}`));
