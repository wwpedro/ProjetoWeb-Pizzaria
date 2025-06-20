const Pedido = require('../models/Pedido');
const Sabor = require('../models/Sabor');
const Bebida = require('../models/Bebida');

// Listar todos os pedidos (ADM)
exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    pedidos.forEach(p => {
      const sabores = JSON.parse(p.sabores);
      console.log('Sabores do pedido:', sabores);
    });

    const isAdmin = true;  // Ativa os botões de administração no EJS
    res.render('pedidos/list', { pedidos, isAdmin });
  } catch (error) {
    console.error('Erro ao listar pedidos (ADM):', error);
    res.status(500).send('Erro ao buscar pedidos.');
  }
};

// Listar pedidos para CLIENTE
exports.listarPedidosCliente = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    pedidos.forEach(p => {
      const sabores = JSON.parse(p.sabores);
      console.log('Sabores do pedido:', sabores);
    });

    const isAdmin = false;  // Desativa os botões de administração no EJS
    res.render('pedidos/list', { pedidos, isAdmin });
  } catch (error) {
    console.error('Erro ao listar pedidos (Cliente):', error);
    res.status(500).send('Erro ao buscar pedidos.');
  }
};

// Exibir formulário de novo pedido
exports.formNovoPedido = async (req, res) => {
  try {
    const sabores = await Sabor.findAll();
    const bebidas = await Bebida.findAll();
    res.render('pedidos/form', { sabores, bebidas });
  } catch (error) {
    console.error('Erro ao carregar formulário de pedido:', error);
    res.status(500).send('Erro ao carregar o formulário de pedido.');
  }
};

// Criar um novo pedido (CLIENTE)
exports.criarPedido = async (req, res) => {
  const {
    nomeCliente,
    tipoAtendimento,
    numeroMesa,
    endereco,
    quantidadePizzas,
    pizzasSabores,
    bebidasSelecionadas
  } = req.body;

  console.log('📥 Dados recebidos:', req.body);

  if (!nomeCliente || !tipoAtendimento || !quantidadePizzas || !pizzasSabores) {
    return res.status(400).send('Por favor, preencha todos os campos obrigatórios.');
  }

  try {
    let totalPedido = 0;
    const pizzas = JSON.parse(pizzasSabores);  // Exemplo: [[1,2],[3]]

    // Calcular total dos sabores
    for (const saboresPizza of pizzas) {
      for (const idSabor of saboresPizza) {
        const sabor = await Sabor.findByPk(idSabor);
        if (sabor) totalPedido += sabor.preco;
      }
    }

    // Calcular total das bebidas
    let bebidasArray = [];
    if (bebidasSelecionadas) {
      bebidasArray = Array.isArray(bebidasSelecionadas)
        ? bebidasSelecionadas
        : [bebidasSelecionadas];

      for (const idBebida of bebidasArray) {
        const bebida = await Bebida.findByPk(idBebida);
        if (bebida) totalPedido += bebida.preco;
      }
    }

    console.log('💰 Total do pedido:', totalPedido.toFixed(2));

    // Criar o pedido
    const novoPedido = await Pedido.create({
      nome_cliente: nomeCliente,
      tipo_atendimento: tipoAtendimento,
      numero_mesa: tipoAtendimento === 'Mesa' ? numeroMesa : null,
      endereco: tipoAtendimento === 'Entrega' ? endereco : null,
      quantidade_pizzas: quantidadePizzas,
      status: 'Em preparo',
      sabores: JSON.stringify(pizzas)
    });

    // Adicionar sabores (Se ainda quiser manter o many-to-many, pode deixar)
    for (const saboresPizza of pizzas) {
      for (const idSabor of saboresPizza) {
        await novoPedido.addSabor(idSabor);
      }
    }

    // Adicionar bebidas
    for (const idBebida of bebidasArray) {
      await novoPedido.addBebida(idBebida);
    }

    // ✅ Redirecionar o cliente para a página de confirmação (SEM expor o /pedidos ADM)
    res.render('pedidos/confirmacao', { nomeCliente });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).send('Erro ao criar pedido.');
  }
};

// Atualizar status do pedido (ADM)
exports.atualizarStatus = async (req, res) => {
  const pedidoId = req.params.id;
  const { novoStatus } = req.body;

  const statusPermitidos = ['Em preparo', 'Pronto', 'Entregue'];

  if (!statusPermitidos.includes(novoStatus)) {
    return res.status(400).send('Status inválido.');
  }

  try {
    await Pedido.update({ status: novoStatus }, { where: { id: pedidoId } });
    res.redirect('/pedidos');
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).send('Erro ao atualizar o status do pedido.');
  }
};
