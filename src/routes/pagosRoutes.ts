import express from 'express';
import { getAllPagos, createPago, updatePago, deletePago } from '../controllers/pagosController';

const router = express.Router();

// Rutas CRUD para Pagos
router.get('/pagos', getAllPagos);
router.post('/pagos', createPago);
router.put('/pagos/:id', updatePago);
router.delete('/pagos/:id', deletePago);

export default router;