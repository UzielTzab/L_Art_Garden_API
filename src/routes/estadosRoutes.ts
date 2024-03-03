import express from 'express';
import { getAllEstados, createEstado, updateEstado, deleteEstado } from '../controllers/estadosController';

const router = express.Router();

// Rutas CRUD para Estados
router.get('/estados', getAllEstados);
router.post('/estados', createEstado);
router.put('/estados/:id', updateEstado);
router.delete('/estados/:id', deleteEstado);

export default router;
