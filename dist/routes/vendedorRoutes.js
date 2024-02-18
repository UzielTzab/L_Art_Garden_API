"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendedorController_1 = require("../controllers/vendedorController");
const router = express_1.default.Router();
// Rutas CRUD para vendedores
router.get('/vendedores', vendedorController_1.getAllVendedores);
router.get('/vendedores/:id', vendedorController_1.getVendedorById);
router.post('/vendedores', vendedorController_1.createVendedor);
router.put('/vendedores/:id', vendedorController_1.updateVendedor);
router.delete('/vendedores/:id', vendedorController_1.deleteVendedor);
exports.default = router;
