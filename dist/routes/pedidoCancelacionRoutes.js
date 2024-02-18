"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidoCancelacionController_1 = require("../controllers/pedidoCancelacionController");
const router = express_1.default.Router();
// Rutas CRUD para Pedidos_Cancelacion
router.get('/pedidos-cancelacion', pedidoCancelacionController_1.getAllPedidosCancelacion);
router.post('/pedidos-cancelacion', pedidoCancelacionController_1.createPedidoCancelacion);
router.delete('/pedidos-cancelacion/:id_pedidos/:id_cancelacion', pedidoCancelacionController_1.deletePedidoCancelacion);
exports.default = router;
