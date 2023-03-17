'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING,
    merchant_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    timestamps: true,
    tableName: 'products',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  products.associate = function(models) {
    products.belongsTo(models.order_items, { foreignKey: "id" });
  };
  return products;
};