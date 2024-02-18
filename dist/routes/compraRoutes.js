"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compraController_1 = require("../controllers/compraController");
const router = express_1.default.Router();
// Rutas CRUD para Compra
router.get('/compra', compraController_1.getAllCompra);
router.post('/compra', compraController_1.createCompra);
router.put('/compra/:id', compraController_1.updateCompra);
router.delete('/compra/:id', compraController_1.deleteCompra);
exports.default = router;
