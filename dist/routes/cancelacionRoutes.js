"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cancelacionController_1 = require("../controllers/cancelacionController");
const router = express_1.default.Router();
// Rutas CRUD para Cancelacion
router.get('/cancelacion', cancelacionController_1.getAllCancelacion);
router.post('/cancelacion', cancelacionController_1.createCancelacion);
router.put('/cancelacion/:id', cancelacionController_1.updateCancelacion);
router.delete('/cancelacion/:id', cancelacionController_1.deleteCancelacion);
exports.default = router;

