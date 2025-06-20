const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const PedidoSabores = sequelize.define('PedidoSabores', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  saborId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  indexes: []  // Nenhum índice UNIQUE aqui!
});

module.exports = PedidoSabores;
