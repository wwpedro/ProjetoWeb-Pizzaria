const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Bebida = sequelize.define('Bebida', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Bebida;
