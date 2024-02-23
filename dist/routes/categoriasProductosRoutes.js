"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriasProductosController_1 = require("../controllers/categoriasProductosController");
const router = express_1.default.Router();
// Rutas CRUD para CategoriasProductos
router.get('/categorias-productos', categoriasProductosController_1.getAllCategoriasProductos);
router.post('/categorias-productos', categoriasProductosController_1.createCategoriaProducto);
router.put('/categorias-productos/:id', categoriasProductosController_1.updateCategoriaProducto);
router.delete('/categorias-productos/:id', categoriasProductosController_1.deleteCategoriaProducto);
exports.default = router;
