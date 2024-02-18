import express from 'express';
import { getAllCompra, createCompra, updateCompra, deleteCompra } from '../controllers/compraController';

const router = express.Router();

// Rutas CRUD para Compra
router.get('/compra', getAllCompra);
router.post('/compra', createCompra);
router.put('/compra/:id', updateCompra);
router.delete('/compra/:id', deleteCompra);

export default router;
