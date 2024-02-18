"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidoDevolucionController_1 = require("../controllers/pedidoDevolucionController");
const router = express_1.default.Router();
// Rutas CRUD para Pedidos_Devolucion
router.get('/pedidos-devolucion', pedidoDevolucionController_1.getAllPedidosDevolucion);
router.post('/pedidos-devolucion', pedidoDevolucionController_1.createPedidoDevolucion);
router.delete('/pedidos-devolucion/:id_pedidos/:id_devolucion', pedidoDevolucionController_1.deletePedidoDevolucion);
exports.default = router;
