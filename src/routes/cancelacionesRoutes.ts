import express from 'express';
import { getAllCancelaciones, createCancelacion, updateCancelacion, deleteCancelacion } from '../controllers/cancelacionesController';

const router = express.Router();

// Rutas CRUD para Cancelaciones
router.get('/cancelaciones', getAllCancelaciones);
router.post('/cancelaciones', createCancelacion);
router.put('/cancelaciones/:id', updateCancelacion);
router.delete('/cancelaciones/:id', deleteCancelacion);

export default router;
