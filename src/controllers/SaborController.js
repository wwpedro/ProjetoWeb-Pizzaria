const Sabor = require('../models/Sabor');

// Formulário para novo sabor
exports.formNovoSabor = (req, res) => {
  res.render('sabores/form', { sabor: null });
};

// Listar todos os sabores
exports.listarSabores = async (req, res) => {
  try {
    const sabores = await Sabor.findAll();
    res.render('sabores/list', { sabores });
  } catch (error) {
    console.error('Erro ao listar sabores:', error);
    res.status(500).send('Erro ao buscar sabores.');
  }
};

// Criar novo sabor
exports.criarSabor = async (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).send('Informe nome e preço do sabor.');
  }

  try {
    await Sabor.create({ nome, preco });
    res.redirect('/sabores');
  } catch (error) {
    console.error('Erro ao criar sabor:', error);
    res.status(500).send('Erro ao criar sabor.');
  }
};

// Formulário de edição
exports.formEditarSabor = async (req, res) => {
  try {
    const sabor = await Sabor.findByPk(req.params.id);
    if (!sabor) return res.status(404).send('Sabor não encontrado.');

    res.render('sabores/form', { sabor });
  } catch (error) {
    console.error('Erro ao carregar sabor:', error);
    res.status(500).send('Erro ao carregar sabor.');
  }
};

// Atualizar sabor
exports.atualizarSabor = async (req, res) => {
  const { nome, preco } = req.body;
  try {
    await Sabor.update({ nome, preco }, { where: { id: req.params.id } });
    res.redirect('/sabores');
  } catch (error) {
    console.error('Erro ao atualizar sabor:', error);
    res.status(500).send('Erro ao atualizar sabor.');
  }
};


// Deletar sabor
exports.deletarSabor = async (req, res) => {
  try {
    await Sabor.destroy({ where: { id: req.params.id } });
    res.redirect('/sabores');
  } catch (error) {
    console.error('Erro ao deletar sabor:', error);
    res.status(500).send('Erro ao deletar sabor.');
  }
};
