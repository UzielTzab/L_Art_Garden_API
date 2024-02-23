"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarioVendedorController_1 = require("../controllers/usuarioVendedorController");
const router = express_1.default.Router();
// Rutas CRUD para UsuarioVendedor
router.get('/usuarios-vendedor', usuarioVendedorController_1.getAllUsuariosVendedor);
router.post('/usuarios-vendedor', usuarioVendedorController_1.createUsuarioVendedor);
router.put('/usuarios-vendedor/:id', usuarioVendedorController_1.updateUsuarioVendedor);
router.delete('/usuarios-vendedor/:id', usuarioVendedorController_1.deleteUsuarioVendedor);
exports.default = router;
