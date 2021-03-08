const db = require('../models');

const Product = {

    async listAll(req, res) {
        // definir um limit e um offset aqui...
        // explorar possíveis erros também...
        try {
            const result = await db.Products.findAll({include: db.Categorys});
            const relevant_data = result.map( product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category_id: product.category_id,
                    category: product.Category.name,
                    status: product.Category.status
                };
            })
            
            return res.status(200).send(JSON.stringify(relevant_data));
        } catch (error) {
            return res.status(500).send(JSON.stringify({ message: error.message }));
        }
    },
    async create(req, res) {
        try {
            const { name, price, category_id } = req.body;
            const success = await db.Products.create({ name, price, category_id });
            return res.status(201).send(JSON.stringify(success));
        } catch (error) {
            return res.status(500).send(JSON.stringify({ message: error.message }));
        }
    },
    async edit(req, res) {
        try {
            // disparar erro de usuário não encontrado pelo id
            const { id } = req.params;
            // disparar erro caso nenhum dos campos for informado
            // ou caso os campos forem inválidos
            const { name, price, category_id } = req.body;
            // disparar erro caso o retorno for 0 no success??
            const success = await db.Products.update(
                { name, price, category_id },
                { where: { id } }
            );
            // mudar o status para 204 e mudar o retorno no 'send'
            return res.status(200).send(JSON.stringify(success));
        } catch (error) {
            return res.status(500).send(JSON.stringify({ message: error.message }));
        }
    },
    async exclude(req, res) {
        try {
            // disparar erro de produto não encontrado
            const { id } = req.params;

            await db.Products.destroy({where: { id: id }});

            // passar status 204 e remover o retorno do 'send'
            return res.status(200).send(JSON.stringify({message: 'removed'}));
        } catch (error) {
            return res.status(500).send(JSON.stringify({ message: error.message }));
        }
    },
    async getByIdOrName(req, res) {
        // verificar possíveis erros disparados aqui também...
        try {
            const {id_or_name} = req.params;
            
            let result;
            if (!Number.isNaN(Number(id_or_name))) {
                result = await db.Products.findByPk(id_or_name, {include: db.Categorys});
            }else{
                result = await db.Products.findOne({
                    where:{name:id_or_name},
                    include: db.Categorys
                });
            }


            if (result === null) {
                throw new Error('Product not found!');
            }

            return res.status(200).send(JSON.stringify(result));
        } catch (error) {
            return res.status(404).send(JSON.stringify({message: error.message}));
            
        }
    }
}

module.exports = Product;