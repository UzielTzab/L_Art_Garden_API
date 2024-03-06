"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estadosController_1 = require("../controllers/estadosController");
const router = express_1.default.Router();
// Rutas CRUD para Estados
router.get('/estados', estadosController_1.getAllEstados);
router.post('/estados', estadosController_1.createEstado);
router.put('/estados/:id', estadosController_1.updateEstado);
router.delete('/estados/:id', estadosController_1.deleteEstado);
exports.default = router;
