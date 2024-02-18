import express from 'express';
import { getAllPedidosCancelacion, createPedidoCancelacion, deletePedidoCancelacion } from '../controllers/pedidoCancelacionController';

const router = express.Router();

// Rutas CRUD para Pedidos_Cancelacion
router.get('/pedidos-cancelacion', getAllPedidosCancelacion);
router.post('/pedidos-cancelacion', createPedidoCancelacion);
router.delete('/pedidos-cancelacion/:id_pedidos/:id_cancelacion', deletePedidoCancelacion);

export default router;
