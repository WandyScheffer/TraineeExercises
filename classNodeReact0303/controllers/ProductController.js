const db = require('../models');
const serializator = require('../routes/serializator');

const Product = {

    async listAll(req, res) {
        try {
            const limit = Number(req.query.limit) || 10;
            const offset = Number(req.query.offset) || 0;
            const result = await db.Products.findAll({include: db.Categorys, limit, offset});
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
            
            return res.status(200).send(serializator.serializing(relevant_data, res.getHeader('Content-Type')));
        } catch (error) {
            return res.status(500).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
        }
    },
    async create(req, res) {
        let res_status = 500;
        try {
            const { name, price, category_id } = req.body;

            if ((typeof (name) !== 'string' || name.length === 0) || (typeof (price) !== 'number' || typeof(category_id)!== 'number')) {
                res_status = 400;
                throw new Error('Missing or invalid parameters!');
            }
            const verify_category = await db.Categorys.findByPk(category_id);
            
            if (!verify_category) {
                res_status = 400;
                throw new Error('Id category is invalid!');
            }

            const success = await db.Products.create({ name, price, category_id });
            return res.status(201).send(serializator.serializing(success, res.getHeader('Content-Type')));
        } catch (error) {
            return res.status(500).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
        }
    },
    async edit(req, res) {
        let res_status = 500;
        try {

            const { id } = req.params;
            if (Number.isNaN(Number(id))) {
                res_status = 400;
                throw new Error('id should be a number!')
            }
            
            const verify_product = await db.Products.findByPk(id)
            if (!verify_product) {
                res_status = 404;
                throw new Error('product not found!')
            }
            
            const { name, price, category_id } = req.body;

            if ((typeof (name) !== 'string' || name.length === 0) && (typeof (price) !== 'number' && typeof(category_id)!== 'number')) {
                res_status = 400;
                throw new Error('Missing or invalid parameters!');
            }

            const success = await db.Products.update(
                { name, price, category_id },
                { where: { id } }
            );

            if (!success){
                res_status = 400;
                throw new Error("Failed to edit, it's probably because of some incorrect parameter...");
            } 
            
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
        }
    },
    async exclude(req, res) {
        let res_status = 500;
        try {            
            const { id } = req.params;
            if (Number.isNaN(Number(id))) {
                res_status = 400;
                throw new Error('id should be a number!')
            }

            const verify_product = await db.Products.findByPk(id);
            
            if (!verify_product) {
                res_status = 404;
                throw new Error('product not found!')
            }

            await db.Products.destroy({where: { id: id }});

            
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
        }
    },
    async getByIdOrName(req, res) {

        let res_status = 500;
        try {
            const {id_or_name} = req.params;
            
            let result;
            if (!Number.isNaN(Number(id_or_name))) {
                result = await db.Products.findByPk(id_or_name, {include: db.Categorys});
            }else if(typeof(id_or_name)==='string' && id_or_name.length > 0){
                result = await db.Products.findOne({
                    where:{name:id_or_name},
                    include: db.Categorys
                });
            }else{
                res_status = 400;
                throw new Error("Failed, it's probably because of some incorrect parameter...");
            }

            if (result === null) {
                res_status = 404;
                throw new Error('Product not found!');
            }

            return res.status(200).send(serializator.serializing(result, res.getHeader('Content-Type')));
        } catch (error) {
            return res.status(500).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
            
        }
    }
}

module.exports = Product;