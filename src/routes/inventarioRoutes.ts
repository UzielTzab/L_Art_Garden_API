import express from 'express';
import { getAllInventario, createInventario, updateInventario, deleteInventario } from '../controllers/inventarioController';

const router = express.Router();

// Rutas CRUD para Inventario
router.get('/inventario', getAllInventario);
router.post('/inventario', createInventario);
router.put('/inventario/:id', updateInventario);
router.delete('/inventario/:id', deleteInventario);

export default router;
