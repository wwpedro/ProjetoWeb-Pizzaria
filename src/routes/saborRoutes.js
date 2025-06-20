const express = require('express');
const router = express.Router();
const SaborController = require('../controllers/SaborController');

router.get('/', SaborController.listarSabores);
router.get('/novo', SaborController.formNovoSabor);
router.post('/', SaborController.criarSabor);
router.get('/:id/editar', SaborController.formEditarSabor);
router.post('/:id/atualizar', SaborController.atualizarSabor);
router.post('/:id/deletar', SaborController.deletarSabor);

module.exports = router;
