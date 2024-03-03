import express from 'express';
import { getAllTipoUsuarios, createTipoUsuario, updateTipoUsuario, deleteTipoUsuario } from '../controllers/tipoUsuarioController';

const router = express.Router();

// Rutas CRUD para TipoUsuario
router.get('/tipoUsuarios', getAllTipoUsuarios);
router.post('/tipoUsuarios', createTipoUsuario);
router.put('/tipoUsuarios/:id', updateTipoUsuario);
router.delete('/tipoUsuarios/:id', deleteTipoUsuario);

export default router;
