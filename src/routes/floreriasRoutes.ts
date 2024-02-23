import express from 'express';
import { getAllFlorerias, createFloreria, updateFloreria, deleteFloreria } from '../controllers/floreriasController';

const router = express.Router();

// Rutas CRUD para Florerias
router.get('/florerias', getAllFlorerias);
router.post('/florerias', createFloreria);
router.put('/florerias/:id', updateFloreria);
router.delete('/florerias/:id', deleteFloreria);

export default router;
