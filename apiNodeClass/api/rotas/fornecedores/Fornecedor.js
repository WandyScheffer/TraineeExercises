const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
    constructor({ id, empresa, email,categoria, dataCriacao, dataAtualizacao, versao }){
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar(){
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async buscaFornecedor(){
        const resultado = await TabelaFornecedor.buscaPorId(this.id);
        this.empresa = resultado.empresa
        this.email = resultado.email
        this.categoria = resultado.categoria
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async atualizar(){
        // a princípio isso n é necessário, n entendi o pq no video essa linha foi inserida
        // await TabelaFornecedor.buscaPorId(this.id);

        const campos = ['empresa', 'email', 'categoria'];
        const dadosParaAtualizar = {};

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof(valor)==='string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor;
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar, ou estes eram inválidos...');
        }
        
        const [atualizado] = await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar);
        if (!atualizado) {
            throw new Error('Não foi atualizado, usuário não encontrado...');
        }
    }
}

module.exports = Fornecedor;