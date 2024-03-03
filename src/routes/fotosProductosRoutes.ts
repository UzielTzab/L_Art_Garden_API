import express from 'express';
import { getFotosProducto, createFotoProducto, deleteFotoProducto } from '../controllers/fotosProductosController';

const router = express.Router();

// Rutas CRUD para FotosProductos
router.get('/fotos-producto/:idProducto', getFotosProducto);
router.post('/fotos-producto', createFotoProducto);
router.delete('/fotos-producto/:idFoto', deleteFotoProducto);

export default router;
