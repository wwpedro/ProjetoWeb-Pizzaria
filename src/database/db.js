const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/pizzaria.db'
});

module.exports = sequelize;