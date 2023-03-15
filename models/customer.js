'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    timestamps: true,
    tableName: 'customers',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  customers.associate = function(models) {
    // associations can be defined here
  };
  return customers;

};