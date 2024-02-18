"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carritoProductosController_1 = require("../controllers/carritoProductosController");
const router = express_1.default.Router();
// Rutas CRUD para Carrito_Productos
router.get('/carrito-productos', carritoProductosController_1.getAllCarritoProductos);
router.post('/carrito-productos', carritoProductosController_1.createCarritoProducto);
router.delete('/carrito-productos/:idCarrito/:idProducto', carritoProductosController_1.deleteCarritoProducto);
exports.default = router;
