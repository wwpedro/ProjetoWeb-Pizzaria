const Bebida = require('../models/Bebida');

// Formulário de novo
exports.formNovaBebida = (req, res) => {
  res.render('bebidas/form', { bebida: null });
};

// Listar todas
exports.listarBebidas = async (req, res) => {
  try {
    const bebidas = await Bebida.findAll();
    res.render('bebidas/list', { bebidas });
  } catch (error) {
    console.error('Erro ao listar bebidas:', error);
    res.status(500).send('Erro ao buscar bebidas.');
  }
};

// Criar nova bebida
exports.criarBebida = async (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).send('Informe nome e preço da bebida.');
  }

  try {
    await Bebida.create({ nome, preco });
    res.redirect('/bebidas');
  } catch (error) {
    console.error('Erro ao criar bebida:', error);
    res.status(500).send('Erro ao criar bebida.');
  }
};

// Formulário de edição
exports.formEditarBebida = async (req, res) => {
  try {
    const bebida = await Bebida.findByPk(req.params.id);
    if (!bebida) return res.status(404).send('Bebida não encontrada.');

    res.render('bebidas/form', { bebida });
  } catch (error) {
    console.error('Erro ao carregar bebida:', error);
    res.status(500).send('Erro ao carregar bebida.');
  }
};

// Atualizar
exports.atualizarBebida = async (req, res) => {
  const { nome, preco } = req.body;
  try {
    await Bebida.update({ nome, preco }, { where: { id: req.params.id } });
    res.redirect('/bebidas');
  } catch (error) {
    console.error('Erro ao atualizar bebida:', error);
    res.status(500).send('Erro ao atualizar bebida.');
  }
};


// Deletar
exports.deletarBebida = async (req, res) => {
  try {
    await Bebida.destroy({ where: { id: req.params.id } });
    res.redirect('/bebidas');
  } catch (error) {
    console.error('Erro ao deletar bebida:', error);
    res.status(500).send('Erro ao deletar bebida.');
  }
};
