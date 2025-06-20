const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Pedido = sequelize.define('Pedido', {
  nome_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_atendimento: {
    type: DataTypes.ENUM('Mesa', 'Retirada', 'Viagem'),
    allowNull: false
  },
  numero_mesa: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true
  },
  quantidade_pizzas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sabores: {
    type: DataTypes.JSON,   // Agora os sabores são guardados como JSON
    allowNull: true
  },
  bebidas: {
    type: DataTypes.JSON,   // Agora as bebidas também são guardadas como JSON
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Em preparo', 'Pronto', 'Entregue'),
    defaultValue: 'Em preparo'
  }
});

module.exports = Pedido;
