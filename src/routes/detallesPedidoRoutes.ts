import express from 'express';
import { getAllDetallesPedido, createDetallePedido, updateDetallePedido, deleteDetallePedido } from '../controllers/detallesPedidoController';

const router = express.Router();

// Rutas CRUD para Detalles de Pedido
router.get('/detallesPedido', getAllDetallesPedido);
router.post('/detallesPedido', createDetallePedido);
router.put('/detallesPedido/:id', updateDetallePedido);
router.delete('/detallesPedido/:id', deleteDetallePedido);

export default router;