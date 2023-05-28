'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {}
  }
  Person.init({
    name: DataTypes.STRING,
    phone: DataTypes.TEXT,
    email: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};