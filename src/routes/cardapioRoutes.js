const express = require('express');
const router = express.Router();
const SaborController = require('../controllers/SaborController');
const BebidaController = require('../controllers/BebidaController');

// Página única com os dois formulários (para ADM)
router.get('/', (req, res) => {
  res.render('cardapio/form');
});

// Rotas para salvar novos sabores e bebidas
router.post('/sabor', SaborController.criarSabor);
router.post('/bebida', BebidaController.criarBebida);

module.exports = router;
