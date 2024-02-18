import express from 'express';
import { getAllCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria } from '../controllers/categoriaController';

const router = express.Router();

// Rutas CRUD para Categoria
router.get('/categoria', getAllCategorias);
router.get('/categoria/:id', getCategoriaById);
router.post('/categoria', createCategoria);
router.put('/categoria/:id', updateCategoria);
router.delete('/categoria/:id', deleteCategoria);

export default router;
