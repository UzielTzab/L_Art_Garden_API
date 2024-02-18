"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const floreriaController_1 = require("../controllers/floreriaController");
const router = express_1.default.Router();
// Rutas CRUD para Floreria
router.get('/floreria', floreriaController_1.getAllFloreria);
router.post('/floreria', floreriaController_1.createFloreria);
router.put('/floreria/:id', floreriaController_1.updateFloreria);
router.delete('/floreria/:id', floreriaController_1.deleteFloreria);
exports.default = router;
