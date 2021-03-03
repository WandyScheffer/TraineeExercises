const Modelo = require('./ModeloTabelaFornecedor');

module.exports = {
    listar(){
        return Modelo.findAll()
    },
    inserir(fornecedor){
        return Modelo.create(fornecedor)
    },
    async buscaPorId(id){
        const encontrado = await Modelo.findByPk(id);
        if (!encontrado) throw new Error('Fornecedor não encontrado');
        
        return encontrado;
    },

    async atualizar(id, dados){
        return Modelo.update(
            dados,
            {
                where: {id}
            }
        )
    },

    async exclui(id){
        return Modelo.destroy({
            where:{
                id
            }
        })
    }
}