"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarioClienteController_1 = require("../controllers/usuarioClienteController");
const router = express_1.default.Router();
// Rutas CRUD para UsuarioCliente
router.get('/usuarios-cliente', usuarioClienteController_1.getAllUsuariosCliente);
router.post('/usuarios-cliente', usuarioClienteController_1.createUsuarioCliente);
router.put('/usuarios-cliente/:id', usuarioClienteController_1.updateUsuarioCliente);
router.delete('/usuarios-cliente/:id', usuarioClienteController_1.deleteUsuarioCliente);
exports.default = router;
