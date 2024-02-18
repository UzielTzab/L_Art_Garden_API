import express from 'express';
import { getAllFloreria, createFloreria, updateFloreria, deleteFloreria } from '../controllers/floreriaController';

const router = express.Router();

// Rutas CRUD para Floreria
router.get('/floreria', getAllFloreria);
router.post('/floreria', createFloreria);
router.put('/floreria/:id', updateFloreria);
router.delete('/floreria/:id', deleteFloreria);

export default router;
