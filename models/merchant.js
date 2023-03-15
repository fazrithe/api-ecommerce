'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const merchants = sequelize.define('merchants', {
    merchant_name: DataTypes.STRING,
    admin_id: DataTypes.INTEGER
  }, {
    timestamps: true,
    tableName: 'merchants',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  merchants.associate = function(models) {
    // associations can be defined here
  };
  return merchants;
};