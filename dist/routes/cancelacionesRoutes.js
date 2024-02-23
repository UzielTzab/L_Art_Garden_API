"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cancelacionesController_1 = require("../controllers/cancelacionesController");
const router = express_1.default.Router();
// Rutas CRUD para Cancelaciones
router.get('/cancelaciones', cancelacionesController_1.getAllCancelaciones);
router.post('/cancelaciones', cancelacionesController_1.createCancelacion);
router.put('/cancelaciones/:id', cancelacionesController_1.updateCancelacion);
router.delete('/cancelaciones/:id', cancelacionesController_1.deleteCancelacion);
exports.default = router;
