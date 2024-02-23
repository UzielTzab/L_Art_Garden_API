import express from 'express';
import { getAllDevoluciones, createDevolucion, updateDevolucion, deleteDevolucion } from '../controllers/devolucionesController';

const router = express.Router();

// Rutas CRUD para Devoluciones
router.get('/devoluciones', getAllDevoluciones);
router.post('/devoluciones', createDevolucion);
router.put('/devoluciones/:id', updateDevolucion);
router.delete('/devoluciones/:id', deleteDevolucion);

export default router;
