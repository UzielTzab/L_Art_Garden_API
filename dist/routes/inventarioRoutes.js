"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventarioController_1 = require("../controllers/inventarioController");
const router = express_1.default.Router();
// Rutas CRUD para Inventario
router.get('/inventario', inventarioController_1.getAllInventario);
router.post('/inventario', inventarioController_1.createInventario);
router.put('/inventario/:id', inventarioController_1.updateInventario);
router.delete('/inventario/:id', inventarioController_1.deleteInventario);
exports.default = router;
