import express from 'express';
import { getAllComentariosResenasProductos, createComentarioResenaProducto, updateComentarioResenaProducto, deleteComentarioResenaProducto } from '../controllers/comentariosResenasProductosController';

const router = express.Router();

// Rutas CRUD para ComentariosResenasProductos
router.get('/comentarios-resenas-productos', getAllComentariosResenasProductos);
router.post('/comentarios-resenas-productos', createComentarioResenaProducto);
router.put('/comentarios-resenas-productos/:id', updateComentarioResenaProducto);
router.delete('/comentarios-resenas-productos/:id', deleteComentarioResenaProducto);

export default router;
