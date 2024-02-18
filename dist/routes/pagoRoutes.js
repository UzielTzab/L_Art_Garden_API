"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagoController_1 = require("../controllers/pagoController");
const router = express_1.default.Router();
// Rutas CRUD para Pago
router.get('/pagos', pagoController_1.getAllPagos);
router.post('/pagos', pagoController_1.createPago);
router.put('/pagos/:id', pagoController_1.updatePago);
router.delete('/pagos/:id', pagoController_1.deletePago);
exports.default = router;
