'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categorys.hasMany(models.Products, {
        foreignKey: 'category_id'
      });
    }
  };
  Categorys.init({
    name: {
     type:DataTypes.STRING,
     allowNull:false,
    },
    status: {
     type: DataTypes.BOOLEAN,
     allowNull: false,
     defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Categorys',
  });
  return Categorys;
};