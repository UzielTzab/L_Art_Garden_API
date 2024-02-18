import express from 'express';
import { getAllCancelacion, createCancelacion, updateCancelacion, deleteCancelacion } from '../controllers/cancelacionController';

const router = express.Router();

// Rutas CRUD para Cancelacion
router.get('/cancelacion', getAllCancelacion);
router.post('/cancelacion', createCancelacion);
router.put('/cancelacion/:id', updateCancelacion);
router.delete('/cancelacion/:id', deleteCancelacion);

export default router;
