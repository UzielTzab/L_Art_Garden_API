"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productosCategoriaController_1 = require("../controllers/productosCategoriaController");
const router = express_1.default.Router();
// Rutas CRUD para productos_categoria
router.get('/productos-categoria', productosCategoriaController_1.getAllProductosCategoria);
router.post('/productos-categoria', productosCategoriaController_1.createProductosCategoria);
router.delete('/productos-categoria/:id_productos/:id_categoria', productosCategoriaController_1.deleteProductosCategoria);
exports.default = router;
