const db = require('../models');
const serializator = require('./../routes/serializator');

const Category = {

    async listAll(req, res) {
        try {
            const limit = Number(req.query.limit) || 10;
            const offset = Number(req.query.offset) || 0;
            const result = await db.Categorys.findAll({ limit, offset });
            return res.status(200).send(serializator.serializing(result, res.getHeader('Content-Type')));
        } catch (error) {
            console.log(error);
            return res.status(500).send(serializator.serializing({message: error.message}, res.getHeader('Content-Type')));
        }
    },
    async create(req, res) {
        let res_status = 500;
        try {
            const { name, status } = req.body;
            if ((typeof (name) !== 'string' || name.length === 0) || (typeof (status) !== 'boolean')) {
                res_status = 400;
                throw new Error('Missing or invalid parameters!');
            }
            const success = await db.Categorys.create({ name, status });
            return res.status(201).send(serializator.serializing(success, res.getHeader('Content-Type')));
        } catch (error) {
            return res.status(res_status).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
        }
    },
    async edit(req, res) {
        let res_status = 500;
        try {
            const { id } = req.params;
            const verify = await db.Categorys.findByPk(id);
            if (!verify) {
                res_status = 404;
                throw new Error('Category not found!');
            }

            const { name, status } = req.body;
            if ((typeof (name) !== 'string' || name.length === 0) && (typeof (status) !== 'boolean')) {
                res_status = 400;
                throw new Error('Missing or invalid parameters!');
            }

            const success = await db.Categorys.update(
                { name, status },
                { where: { id } }
            );
            if (!success) {
                res_status = 400;
                throw new Error("Failed to edit, it's probably because of some incorrect parameter...");
            }

            return res.status(204).send();
        } catch (error) {
            return res.status(res_status).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
        }
    },
    async exclude(req, res) {
        res_status = 500;
        try {
            
            const { id } = req.params;
            const verify = await db.Categorys.findByPk(id);
            if (!verify) {
                res_status = 404;
                throw new Error('Category not found!');
            }
            await db.sequelize.transaction( async (t) => {
                await db.Products.destroy(
                    { where: { category_id: id } },
                    { transaction: t }
                );
    
                await db.Categorys.destroy(
                    { where: { id } },
                    { transaction: t }
                );

                return;
            });

            return res.status(204).send();
        } catch (error) {
            return res.status(res_status).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
        }
    },
    async getByIdOrName(req, res) {
        let res_status = 500;
        try {
            const { id_or_name } = req.params;

            let result;
            if (!Number.isNaN(Number(id_or_name))) {
                result = await db.Categorys.findByPk(id_or_name, { include: db.Products });
            } else {
                result = await db.Categorys.findOne({
                    where: { name: id_or_name },
                    include: db.Products
                });
            }


            if (result === null) {
                res_status = 404;
                throw new Error('Category not found!');
            }

            return res.status(200).send(serializator.serializing(result, res.getHeader('Content-Type')));
        } catch (error) {
            console.log(error);
            return res.status(res_status).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
        }
    },
    async getActive(req, res) {
        try {
            const minprice = req.query.minprice || 10;
            const result = await db.Categorys.findAll({
                where: { status: true },
                include: {
                    model: db.Products,
                    where: {
                        price: {
                            [db.Sequelize.Op.gt]: minprice
                        }
                    }
                }
            });

            return res.status(200).send(serializator.serializing(result, res.getHeader('Content-Type')));
        } catch (error) {

            return res.status(res_status).send(serializator.serializing({ message: error.message }, res.getHeader('Content-Type')));
        }
    }
}

module.exports = Category;