"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carritoController_1 = require("../controllers/carritoController");
const router = express_1.default.Router();
// Rutas CRUD para Carrito
router.get('/carrito', carritoController_1.getAllCarrito);
router.post('/carrito', carritoController_1.createCarrito);
router.put('/carrito/:id', carritoController_1.updateCarrito);
router.delete('/carrito/:id', carritoController_1.deleteCarrito);
exports.default = router;
