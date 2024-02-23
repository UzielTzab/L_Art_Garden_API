import express from 'express';
import { getAllDireccionesEnvio, createDireccionEnvio, updateDireccionEnvio, deleteDireccionEnvio } from '../controllers/direccionesEnvioController';

const router = express.Router();

// Rutas CRUD para DireccionesEnvio
router.get('/direcciones-envio', getAllDireccionesEnvio);
router.post('/direcciones-envio', createDireccionEnvio);
router.put('/direcciones-envio/:id', updateDireccionEnvio);
router.delete('/direcciones-envio/:id', deleteDireccionEnvio);

export default router;
