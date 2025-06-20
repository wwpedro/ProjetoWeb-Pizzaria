const sequelize = require('../database/db');
const Pedido = require('./Pedido');
const Sabor = require('./Sabor');
const Bebida = require('./Bebida');
const PedidoSabores = require('./PedidoSabores');

// Relacionamento Pedido ↔️ Sabor (N:N) PERMITINDO REPETIÇÃO
Pedido.belongsToMany(Sabor, {
  through: {
    model: PedidoSabores,
    unique: false
  },
  foreignKey: 'pedidoId',
  otherKey: 'saborId'
});

Sabor.belongsToMany(Pedido, {
  through: {
    model: PedidoSabores,
    unique: false
  },
  foreignKey: 'saborId',
  otherKey: 'pedidoId'
});

// Relacionamento Pedido ↔️ Bebida (N:N) PERMITINDO REPETIÇÃO
Pedido.belongsToMany(Bebida, {
  through: {
    model: 'PedidoBebidas',
    unique: false
  },
  foreignKey: 'pedidoId',
  otherKey: 'bebidaId'
});

Bebida.belongsToMany(Pedido, {
  through: {
    model: 'PedidoBebidas',
    unique: false
  },
  foreignKey: 'bebidaId',
  otherKey: 'pedidoId'
});

module.exports = {
  sequelize,
  Pedido,
  Sabor,
  Bebida,
  PedidoSabores
};
