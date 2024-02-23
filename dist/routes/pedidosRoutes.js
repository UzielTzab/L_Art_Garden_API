"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidosController_1 = require("../controllers/pedidosController");
const router = express_1.default.Router();
// Rutas CRUD para Pedidos
router.get('/pedidos', pedidosController_1.getAllPedidos);
router.post('/pedidos', pedidosController_1.createPedido);
router.put('/pedidos/:id', pedidosController_1.updatePedido);
router.delete('/pedidos/:id', pedidosController_1.deletePedido);
exports.default = router;
