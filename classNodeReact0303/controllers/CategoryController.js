const db = require('../models');

const Category = {

    async listAll(req, res) {
        try {
            const limit = Number(req.query.limit) || 10;
            const offset = Number(req.query.offset) || 0;
            const result = await db.Categorys.findAll({ limit, offset });
            return res.status(200).send(JSON.stringify(result));
        } catch (error) {
            return res.status(500).send(JSON.stringify({ message: error.message }));
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
            return res.status(201).send(JSON.stringify(success));
        } catch (error) {
            return res.status(res_status).send(JSON.stringify({ message: error.message }));
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
            return res.status(res_status).send(JSON.stringify({ message: error.message }));
        }
    },
    async exclude(req, res) {
        const t = await db.sequelize.transaction();
        try {
            const { id } = req.params;
            const verify = await db.Categorys.findByPk(id);
            if (!verify) {
                res_status = 404;
                throw new Error('Category not found!');
            }

            await db.Products.destroy(
                { where: { category_id: id } },
                { transaction: t }
            );

            await db.Categorys.destroy(
                { where: { id } },
                { transaction: t }
            );

            await t.commit();
            return res.status(204).send();
        } catch (error) {
            await t.rollback();
            return res.status(500).send(JSON.stringify({ message: error.message }));
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

            return res.status(200).send(JSON.stringify(result));
        } catch (error) {
            return res.status(res_status).send(JSON.stringify({ message: error.message }));
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

            return res.status(200).send(JSON.stringify(result));
        } catch (error) {

            return res.status(500).send(JSON.stringify({ message: error.message }));
        }
    }
}

module.exports = Category;