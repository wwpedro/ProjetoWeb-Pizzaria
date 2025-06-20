const express = require('express');
const router = express.Router();
const BebidaController = require('../controllers/BebidaController');

router.get('/', BebidaController.listarBebidas);
router.get('/novo', BebidaController.formNovaBebida);
router.post('/', BebidaController.criarBebida);
router.get('/:id/editar', BebidaController.formEditarBebida);
router.post('/:id/atualizar', BebidaController.atualizarBebida);
router.post('/:id/deletar', BebidaController.deletarBebida);

module.exports = router;
