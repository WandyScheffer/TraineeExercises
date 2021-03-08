const db = require('../models');

const Category = {

    async listAll(req, res) {
        try {
            const result = await db.Categorys.findAll();
            return res.status(200).send(JSON.stringify(result));
        } catch (error) {
            return res.status(500).send(JSON.stringify({ message: error.message }));
        }
    },
    async create(req, res) {
        try {
            const { name, status } = req.body;
            const success = await db.Categorys.create({ name, status });
            return res.status(201).send(JSON.stringify(success));
        } catch (error) {
            return res.status(500).send(JSON.stringify({ message: error.message }));
        }
    },
    async edit(req, res) {
        try {
            // disparar erro de categoria não encontrada pelo id
            const { id } = req.params;
            // disparar erro caso nenhum dos campos for informado
            // ou caso os campos forem inválidos
            const { name, status } = req.body;
            // disparar erro caso o retorno for 0 no success??
            const success = await db.Categorys.update(
                { name, status },
                { where: { id } }
            );
            // mudar o status para 204 e mudar o retorno no 'send'
            return res.status(200).send(JSON.stringify(success));
        } catch (error) {
            return res.status(500).send(JSON.stringify({ message: error.message }));
        }
    },
    async exclude(req, res) {
        const t = await db.sequelize.transaction();
        try {
            // disparar erro de categoria não encontrada
            const { id } = req.params;

            await db.Products.destroy(
                {where: { category_id: id }},
                { transaction: t }
            );

            await db.Categorys.destroy(
                {where: { id }},
                { transaction: t }
            );

            await t.commit();
            // passar status 204 e remover o retorno do 'send'
            return res.status(204).send();
        } catch (error) {
            await t.rollback();
            return res.status(500).send(JSON.stringify({ message: error.message }));
        }
    },
    async getByIdOrName(req, res) {
        // verificar possíveis erros disparados aqui também...
        try {
            const {id_or_name} = req.params;
            
            let result;
            if (!Number.isNaN(Number(id_or_name))) {
                result = await db.Categorys.findByPk(id_or_name, {include: db.Products});
            }else{
                result = await db.Categorys.findOne({
                    where:{name:id_or_name},
                    include: db.Products
                });
            }


            if (result === null) {
                throw new Error('Category not found!');
            }

            return res.status(200).send(JSON.stringify(result));
        } catch (error) {
            return res.status(404).send(JSON.stringify({message: error.message}));
            
        }
    },
    async getActive(req, res){
        try {
            const {minprice} = req.query;
            const result = await db.Categorys.findAll({
                where:{status:true},
                include:{
                    model:db.Products,
                    where:{
                        price:{
                            [db.Sequelize.Op.gt]:minprice
                        }
                    }
                }
            });

            return res.status(200).send(JSON.stringify(result));
        } catch (error) {
            
            return res.status(500).send(JSON.stringify({message: error.message}));
        }
    }
}

module.exports = Category;