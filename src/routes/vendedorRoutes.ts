import express from 'express';
import { getAllVendedores, getVendedorById, createVendedor, updateVendedor, deleteVendedor } from '../controllers/vendedorController';

const router = express.Router();

// Rutas CRUD para vendedores
router.get('/vendedores', getAllVendedores);
router.get('/vendedores/:id', getVendedorById);
router.post('/vendedores', createVendedor);
router.put('/vendedores/:id', updateVendedor);
router.delete('/vendedores/:id', deleteVendedor);

export default router;
