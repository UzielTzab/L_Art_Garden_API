"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const direccionesEnvioController_1 = require("../controllers/direccionesEnvioController");
const router = express_1.default.Router();
// Rutas CRUD para DireccionesEnvio
router.get('/direcciones-envio', direccionesEnvioController_1.getAllDireccionesEnvio);
router.post('/direcciones-envio', direccionesEnvioController_1.createDireccionEnvio);
router.put('/direcciones-envio/:id', direccionesEnvioController_1.updateDireccionEnvio);
router.delete('/direcciones-envio/:id', direccionesEnvioController_1.deleteDireccionEnvio);
exports.default = router;
