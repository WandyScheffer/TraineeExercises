const Sequelize = require('sequelize');
const config = require('config')

const { database, user, pass, host } = config.get("mysql");

const instancia = new Sequelize(database, user, pass, {
    host,
    dialect: 'mysql'
});

module.exports = instancia;