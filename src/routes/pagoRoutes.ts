import express from 'express';
import { getAllPagos, createPago, updatePago, deletePago } from '../controllers/pagoController';

const router = express.Router();

// Rutas CRUD para Pago
router.get('/pagos', getAllPagos);
router.post('/pagos', createPago);
router.put('/pagos/:id', updatePago);
router.delete('/pagos/:id', deletePago);

export default router;
