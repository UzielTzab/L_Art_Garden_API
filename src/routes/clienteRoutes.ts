import express from 'express';
import { getAllCliente, createCliente, updateCliente, deleteCliente } from '../controllers/clienteController';

const router = express.Router();

// Rutas CRUD para Cliente
router.get('/cliente', getAllCliente);
router.post('/cliente', createCliente);
router.put('/cliente/:id', updateCliente);
router.delete('/cliente/:id', deleteCliente);

export default router;
