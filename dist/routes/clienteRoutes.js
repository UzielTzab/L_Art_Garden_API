"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteController_1 = require("../controllers/clienteController");
const router = express_1.default.Router();
// Rutas CRUD para Cliente
router.get('/cliente', clienteController_1.getAllCliente);
router.post('/cliente', clienteController_1.createCliente);
router.put('/cliente/:id', clienteController_1.updateCliente);
router.delete('/cliente/:id', clienteController_1.deleteCliente);
exports.default = router;
