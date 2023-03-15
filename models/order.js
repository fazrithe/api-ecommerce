'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    customer_id: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    timestamps: true,
    tableName: 'orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  orders.associate = function(models) {
    orders.hasMany(models.order_items, { foreignKey: "order_id" });
  };

  return orders;
  
};