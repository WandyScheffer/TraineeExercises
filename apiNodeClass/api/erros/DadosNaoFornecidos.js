class DadosNaoFornecidos extends Error{
    constructor(){
        super('Não foram fornecidos dados para atualizar, ou estes eram inválidos...');
        this.name = 'DadosNaoFornecidos';
        this.idErro = 2;
    }
}

module.exports = DadosNaoFornecidos;