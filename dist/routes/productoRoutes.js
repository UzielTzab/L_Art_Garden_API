"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productoController_1 = require("../controllers/productoController");
const router = express_1.default.Router();
// Rutas CRUD para productos
router.get('/productos', productoController_1.getAllProductos);
router.get('/productos/:id', productoController_1.getProductoById);
router.post('/productos', productoController_1.createProducto);
router.put('/productos/:id', productoController_1.updateProducto);
router.delete('/productos/:id', productoController_1.deleteProducto);
exports.default = router;
