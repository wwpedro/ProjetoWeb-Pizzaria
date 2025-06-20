const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Sabor = sequelize.define('Sabor', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Sabor;
