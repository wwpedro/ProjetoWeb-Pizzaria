const { sequelize, Sabor, Bebida } = require('./models');

async function popularBanco() {
  try {
    await sequelize.sync({ force: true });  // ⚠️ Cuidado: Isso apaga tudo e recria as tabelas!

    // Sabores
    const sabores = [
      { nome: 'Calabresa', preco: 20.0 },
      { nome: 'Frango com Catupiry', preco: 22.5 },
      { nome: 'Quatro Queijos', preco: 25.0 },
      { nome: 'Portuguesa', preco: 23.0 }
    ];

    // Bebidas
    const bebidas = [
      { nome: 'Coca-Cola 2L', preco: 10.0 },
      { nome: 'Guaraná 2L', preco: 9.5 },
      { nome: 'Água Mineral', preco: 4.0 }
    ];

    await Sabor.bulkCreate(sabores);
    await Bebida.bulkCreate(bebidas);

    console.log('✅ Banco populado com sucesso!');
    process.exit();
  } catch (error) {
    console.error('❌ Erro ao popular o banco:', error);
    process.exit(1);
  }
}

popularBanco();
