"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidoController_1 = require("../controllers/pedidoController");
const router = express_1.default.Router();
// Rutas CRUD para Pedidos
router.get('/pedidos', pedidoController_1.getAllPedidos);
router.post('/pedidos', pedidoController_1.createPedido);
router.put('/pedidos/:id', pedidoController_1.updatePedido);
router.delete('/pedidos/:id', pedidoController_1.deletePedido);
exports.default = router;
