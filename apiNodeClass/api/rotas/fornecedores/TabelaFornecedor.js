const Modelo = require('./ModeloTabelaFornecedor');
const NaoEncontrado = require('../../erros/NaoEncontrado');

module.exports = {
    listar(){
        return Modelo.findAll({raw:true})
    },
    inserir(fornecedor){
        return Modelo.create(fornecedor)
    },
    async buscaPorId(id){
        const encontrado = await Modelo.findByPk(id);
        if (!encontrado) throw new NaoEncontrado();
        
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