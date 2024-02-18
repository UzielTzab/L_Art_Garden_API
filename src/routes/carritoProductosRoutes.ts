import express from 'express';
import { getAllCarritoProductos, createCarritoProducto, deleteCarritoProducto } from '../controllers/carritoProductosController';

const router = express.Router();

// Rutas CRUD para Carrito_Productos
router.get('/carrito-productos', getAllCarritoProductos);
router.post('/carrito-productos', createCarritoProducto);
router.delete('/carrito-productos/:idCarrito/:idProducto', deleteCarritoProducto);

export default router;
