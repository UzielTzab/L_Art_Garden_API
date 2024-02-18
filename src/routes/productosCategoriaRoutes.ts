import express from 'express';
import { getAllProductosCategoria, createProductosCategoria, deleteProductosCategoria } from '../controllers/productosCategoriaController';

const router = express.Router();

// Rutas CRUD para productos_categoria
router.get('/productos-categoria', getAllProductosCategoria);
router.post('/productos-categoria', createProductosCategoria);
router.delete('/productos-categoria/:id_productos/:id_categoria', deleteProductosCategoria);

export default router;
