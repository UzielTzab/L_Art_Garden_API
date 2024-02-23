"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const devolucionesController_1 = require("../controllers/devolucionesController");
const router = express_1.default.Router();
// Rutas CRUD para Devoluciones
router.get('/devoluciones', devolucionesController_1.getAllDevoluciones);
router.post('/devoluciones', devolucionesController_1.createDevolucion);
router.put('/devoluciones/:id', devolucionesController_1.updateDevolucion);
router.delete('/devoluciones/:id', devolucionesController_1.deleteDevolucion);
exports.default = router;
