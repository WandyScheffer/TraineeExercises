const jsontoxml = require('jsontoxml');
class Serializador {
    json(dados) {
        return JSON.stringify(dados)
    }

    xml(dados){
        let tag = this.tagOnly;
        if (Array.isArray(dados)) {
            tag = this.tagMultiples
            dados = dados.map(item => {
                return {
                    [this.tagOnly]: item
                }
            })
        }
        return jsontoxml({ [tag]: dados });
    }

    serializar(dados) {
        dados = this.filtrar(dados);

        if (this.contentType === 'application/json') {
            return this.json(dados);
        }else if (this.contentType === 'application/xml') {
            return this.xml(dados);
        }

        throw new Error(this.contentType)
    }

    filtrarObjeto(dados) {
        const novoObjeto = {}
        // console.log(dados);
        this.publicFields.forEach((campo) => {
            // console.log(campo);
            if (dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    filtrar(dados) {
        if (Array.isArray(dados)) {
            dados = dados.map(item => {
                return this.filtrarObjeto(item)
            })
        } else {
            dados = this.filtrarObjeto(dados)
        }

        return dados
    }
}

class SerializadorUser extends Serializador{
    constructor(contentType, extraFields){
        super();
        this.contentType = contentType;
        this.publicFields = ['id', 'name'].concat(extraFields || []);
        this.tagOnly = 'user';
        this.tagMultiples = 'users';
    }
}

module.exports = {
    Serializador,
    SerializadorUser,
    acceptedFormats: ['application/json', 'application/xml']
}