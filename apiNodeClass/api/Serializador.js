const ValorNaoSuportado = require('./erros/ValorNaoSuportado');

class Serializador {
    json (dados) {
        JSON.stringify(dados)
    }

    serializar (dados) {
        if (this.contentType === 'application/json') {
            return this.json(dados)
        }

        throw new ValorNaoSuportado(this.contentType);

    }
    
}

module.exports = {
    Serializador,
    acceptedFormats:['application/json']
};