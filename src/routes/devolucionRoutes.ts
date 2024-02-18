import express from 'express';
import { getAllDevolucion, createDevolucion, updateDevolucion, deleteDevolucion } from '../controllers/devolucionController';

const router = express.Router();

// Rutas CRUD para Devolucion
router.get('/devolucion', getAllDevolucion);
router.post('/devolucion', createDevolucion);
router.put('/devolucion/:id', updateDevolucion);
router.delete('/devolucion/:id', deleteDevolucion);

export default router;
