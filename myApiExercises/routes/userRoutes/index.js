const express = require('express');
const ErrorBadRequest = require('./ErrorBadRequest');
const ErrorNotFound = require('./ErrorNotFound');
const route = express.Router();

const TabelaDeUsuarios = {
    tabela: [
        { id: 1, name: 'zé' },
        { id: 2, name: 'joão' },
    ],
    pegarPorId(id) {
        let foundUser = this.tabela.find(user => {
            return user.id == id;
        });

        const index = this.tabela.indexOf(foundUser);
        return { ...foundUser, index };
    },
    atualizar(index, dados) {
        this.tabela[index] = Object.assign({}, this.tabela[index], dados);
    }
}

route.get('/', (req, res) => {
    res.send(JSON.stringify(TabelaDeUsuarios.tabela));
})

route.put('/:idUsuario', async (requisicao, resposta) => {
    try {
        const dados = requisicao.body
        const id = requisicao.params.idUsuario

        const encontrado = await TabelaDeUsuarios.pegarPorId(id)

        if (encontrado.index === -1) {
            throw new ErrorNotFound();
        }

        if (dados.name === undefined || dados.name.length === 0) {
            throw new ErrorBadRequest();
        }

        const { index: pos } = encontrado;
        TabelaDeUsuarios.atualizar(pos, dados);
        resposta.end()
    } catch (erro) {
        resposta.status(erro.idError).send(JSON.stringify({ mensagem: erro.message }))
    }
})

module.exports = route;