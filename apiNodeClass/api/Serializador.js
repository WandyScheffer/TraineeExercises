const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const jsontoxml = require('jsontoxml')

class Serializador {
    json(dados) {
        return JSON.stringify(dados);
    }

    xml(dados) {
        let tag = this.tagSingular;
        if (Array.isArray(dados)) {
            tag = this.tagPlural
            dados = dados.map(item => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({ [this.tag]: dados });
    }

    serializar(dados) {
        dados = this.filtrar(dados);

        if (this.contentType === 'application/json') {
            return this.json(dados);
        } else if (this.contentType === 'application/xml') {
            return this.xml(dados)
        }

        throw new ValorNaoSuportado(this.contentType);

    }

    filtrarObjeto(dados) {
        const newObject = {};

        this.publicFields.forEach(field => {
            if (dados.hasOwnProperty(field)) {
                newObject[field] = dados[field];
            }
        })
        return newObject;
    }

    filtrar(dados) {
        if (Array.isArray(dados)) {
            dados = dados.map(item => this.filtrarObjeto(item))
        } else {
            dados = this.filtrarObjeto(dados);
        }

        return dados;
    }
}

class SerializadorFornecedor extends Serializador {
    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        this.publicFields = ['id', 'empresa', 'categoria']
            .concat(camposExtras || []);
        this.tagSingular = 'fornecedor';
        this.tagPlural = 'fornecedores';
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        this.publicFields = ['id', 'message'].concat(camposExtras || []);
        this.tagSingular = 'erro';
        this.tagPlural = 'erros';
    }
}

module.exports = {
    Serializador,
    SerializadorFornecedor,
    SerializadorErro,
    acceptedFormats: ['application/json', 'application/xml']
};