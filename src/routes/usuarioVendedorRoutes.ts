import express from 'express';
import { getAllUsuariosVendedor, createUsuarioVendedor, updateUsuarioVendedor, deleteUsuarioVendedor } from '../controllers/usuarioVendedorController';

const router = express.Router();

// Rutas CRUD para UsuarioVendedor
router.get('/usuarios-vendedor', getAllUsuariosVendedor);
router.post('/usuarios-vendedor', createUsuarioVendedor);
router.put('/usuarios-vendedor/:id', updateUsuarioVendedor);
router.delete('/usuarios-vendedor/:id', deleteUsuarioVendedor);

export default router;
