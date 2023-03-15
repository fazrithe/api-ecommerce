'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const order_items = sequelize.define('order_items', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    timestamps: true,
    tableName: 'order_items',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  order_items.associate = function(models) {
    order_items.belongsTo(models.products, { foreignKey: "product_id" });
  };
  return order_items;
};