import express from 'express';
import { getAllCategoriasProductos, createCategoriaProducto, updateCategoriaProducto, deleteCategoriaProducto } from '../controllers/categoriasProductosController';

const router = express.Router();

// Rutas CRUD para CategoriasProductos
router.get('/categorias-productos', getAllCategoriasProductos);
router.post('/categorias-productos', createCategoriaProducto);
router.put('/categorias-productos/:id', updateCategoriaProducto);
router.delete('/categorias-productos/:id', deleteCategoriaProducto);

export default router;