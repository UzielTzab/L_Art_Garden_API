"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comentariosResenasProductosController_1 = require("../controllers/comentariosResenasProductosController");
const router = express_1.default.Router();
// Rutas CRUD para ComentariosResenasProductos
router.get('/comentarios-resenas-productos', comentariosResenasProductosController_1.getAllComentariosResenasProductos);
router.post('/comentarios-resenas-productos', comentariosResenasProductosController_1.createComentarioResenaProducto);
router.put('/comentarios-resenas-productos/:id', comentariosResenasProductosController_1.updateComentarioResenaProducto);
router.delete('/comentarios-resenas-productos/:id', comentariosResenasProductosController_1.deleteComentarioResenaProducto);
exports.default = router;
