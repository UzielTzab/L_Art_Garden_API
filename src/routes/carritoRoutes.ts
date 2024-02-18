import express from 'express';
import { getAllCarrito, createCarrito, updateCarrito, deleteCarrito } from '../controllers/carritoController';

const router = express.Router();

// Rutas CRUD para Carrito
router.get('/carrito', getAllCarrito);
router.post('/carrito', createCarrito);
router.put('/carrito/:id', updateCarrito);
router.delete('/carrito/:id', deleteCarrito);

export default router;
