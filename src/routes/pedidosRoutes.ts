import express from 'express';
import { getAllPedidos, createPedido, updatePedido, deletePedido } from '../controllers/pedidosController';

const router = express.Router();

// Rutas CRUD para Pedidos
router.get('/pedidos', getAllPedidos);
router.post('/pedidos', createPedido);
router.put('/pedidos/:id', updatePedido);
router.delete('/pedidos/:id', deletePedido);

export default router;
