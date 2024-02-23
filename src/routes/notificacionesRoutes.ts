import express from 'express';
import { getAllNotificaciones, createNotificacion, updateNotificacion, deleteNotificacion } from '../controllers/notificacionesController';

const router = express.Router();

// Rutas CRUD para Notificaciones
router.get('/notificaciones', getAllNotificaciones);
router.post('/notificaciones', createNotificacion);
router.put('/notificaciones/:id', updateNotificacion);
router.delete('/notificaciones/:id', deleteNotificacion);

export default router;
