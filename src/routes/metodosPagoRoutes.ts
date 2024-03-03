import express from 'express';
import { getAllMetodosPago, createMetodoPago, updateMetodoPago, deleteMetodoPago } from '../controllers/metodosPagoController';

const router = express.Router();

// Rutas CRUD para Métodos de Pago
router.get('/metodos-pago', getAllMetodosPago);
router.post('/metodos-pago', createMetodoPago);
router.put('/metodos-pago/:id', updateMetodoPago);
router.delete('/metodos-pago/:id', deleteMetodoPago);

export default router;
