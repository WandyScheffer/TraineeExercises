'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Categorys, {
        foreignKey: 'category_id'
      });
    }
  };
  Products.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};