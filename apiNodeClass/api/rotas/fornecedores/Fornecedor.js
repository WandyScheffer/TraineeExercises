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
        this.validar();
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
        await TabelaFornecedor.buscaPorId(this.id);
        const dadosParaAtualizar = this.validar(false);
        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar);
    }
    
    async excluir(){
        await TabelaFornecedor.exclui(this.id);
    }

    validar(parametrosObrigatorios = true){
        const campos = ['empresa', 'email', 'categoria'];
        
        if (parametrosObrigatorios) {
            campos.forEach(campo => {
                const valor = this[campo]
                    
                if (typeof(valor)!=='string' || valor.length === 0) {
                    throw new Error(`Campo ${campo} está inválido`);
                }
            })    
        }
        
        const dadosValidados = {};
    
        campos.forEach(campo => {
            const valor = this[campo]                
            if (typeof(valor)==='string' && valor.length > 0) {
                dadosValidados[campo] = valor;
            }
        })
            
        if (Object.keys(dadosValidados).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar, ou estes eram inválidos...');
        }
        return dadosValidados;
    }
}

module.exports = Fornecedor;