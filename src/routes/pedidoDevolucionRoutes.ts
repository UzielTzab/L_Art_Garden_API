import express from 'express';
import { getAllPedidosDevolucion, createPedidoDevolucion, deletePedidoDevolucion } from '../controllers/pedidoDevolucionController';

const router = express.Router();

// Rutas CRUD para Pedidos_Devolucion
router.get('/pedidos-devolucion', getAllPedidosDevolucion);
router.post('/pedidos-devolucion', createPedidoDevolucion);
router.delete('/pedidos-devolucion/:id_pedidos/:id_devolucion', deletePedidoDevolucion);

export default router;
