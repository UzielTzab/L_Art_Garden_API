"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tipoUsuarioController_1 = require("../controllers/tipoUsuarioController");
const router = express_1.default.Router();
// Rutas CRUD para TipoUsuario
router.get('/tipoUsuarios', tipoUsuarioController_1.getAllTipoUsuarios);
router.post('/tipoUsuarios', tipoUsuarioController_1.createTipoUsuario);
router.put('/tipoUsuarios/:id', tipoUsuarioController_1.updateTipoUsuario);
router.delete('/tipoUsuarios/:id', tipoUsuarioController_1.deleteTipoUsuario);
exports.default = router;
