"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const detallesPedidoController_1 = require("../controllers/detallesPedidoController");
const router = express_1.default.Router();
// Rutas CRUD para Detalles de Pedido
router.get('/detallesPedido', detallesPedidoController_1.getAllDetallesPedido);
router.post('/detallesPedido', detallesPedidoController_1.createDetallePedido);
router.put('/detallesPedido/:id', detallesPedidoController_1.updateDetallePedido);
router.delete('/detallesPedido/:id', detallesPedidoController_1.deleteDetallePedido);
exports.default = router;
