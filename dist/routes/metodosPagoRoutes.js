"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metodosPagoController_1 = require("../controllers/metodosPagoController");
const router = express_1.default.Router();
// Rutas CRUD para Métodos de Pago
router.get('/metodos-pago', metodosPagoController_1.getAllMetodosPago);
router.post('/metodos-pago', metodosPagoController_1.createMetodoPago);
router.put('/metodos-pago/:id', metodosPagoController_1.updateMetodoPago);
router.delete('/metodos-pago/:id', metodosPagoController_1.deleteMetodoPago);
exports.default = router;
