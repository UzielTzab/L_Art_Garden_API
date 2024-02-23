import express from 'express';
import { getAllProductos, createProducto, updateProducto, deleteProducto } from '../controllers/productosController';

const router = express.Router();

// Rutas CRUD para Productos
router.get('/productos', getAllProductos);
router.post('/productos', createProducto);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);

export default router;
