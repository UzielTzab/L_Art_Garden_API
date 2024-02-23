"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productosController_1 = require("../controllers/productosController");
const router = express_1.default.Router();
// Rutas CRUD para Productos
router.get('/productos', productosController_1.getAllProductos);
router.post('/productos', productosController_1.createProducto);
router.put('/productos/:id', productosController_1.updateProducto);
router.delete('/productos/:id', productosController_1.deleteProducto);
exports.default = router;
