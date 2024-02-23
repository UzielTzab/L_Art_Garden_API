import express from 'express';
import { getAllUsuariosCliente, createUsuarioCliente, updateUsuarioCliente, deleteUsuarioCliente } from '../controllers/usuarioClienteController';

const router = express.Router();

// Rutas CRUD para UsuarioCliente
router.get('/usuarios-cliente', getAllUsuariosCliente);
router.post('/usuarios-cliente', createUsuarioCliente);
router.put('/usuarios-cliente/:id', updateUsuarioCliente);
router.delete('/usuarios-cliente/:id', deleteUsuarioCliente);

export default router;