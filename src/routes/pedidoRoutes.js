const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

router.get('/', PedidoController.listarPedidos);                  // Rota para ADM
router.get('/cliente', PedidoController.listarPedidosCliente);    // Nova rota para CLIENTE
router.get('/novo', PedidoController.formNovoPedido);
router.post('/', PedidoController.criarPedido);
router.post('/:id/status', PedidoController.atualizarStatus);

module.exports = router;
