"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const devolucionController_1 = require("../controllers/devolucionController");
const router = express_1.default.Router();
// Rutas CRUD para Devolucion
router.get('/devolucion', devolucionController_1.getAllDevolucion);
router.post('/devolucion', devolucionController_1.createDevolucion);
router.put('/devolucion/:id', devolucionController_1.updateDevolucion);
router.delete('/devolucion/:id', devolucionController_1.deleteDevolucion);
exports.default = router;
