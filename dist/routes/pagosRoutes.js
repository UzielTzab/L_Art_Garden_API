"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagosController_1 = require("../controllers/pagosController");
const router = express_1.default.Router();
// Rutas CRUD para Pagos
router.get('/pagos', pagosController_1.getAllPagos);
router.post('/pagos', pagosController_1.createPago);
router.put('/pagos/:id', pagosController_1.updatePago);
router.delete('/pagos/:id', pagosController_1.deletePago);
exports.default = router;
