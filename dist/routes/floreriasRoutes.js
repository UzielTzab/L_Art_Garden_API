"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const floreriasController_1 = require("../controllers/floreriasController");
const router = express_1.default.Router();
// Rutas CRUD para Florerias
router.get('/florerias', floreriasController_1.getAllFlorerias);
router.post('/florerias', floreriasController_1.createFloreria);
router.put('/florerias/:id', floreriasController_1.updateFloreria);
router.delete('/florerias/:id', floreriasController_1.deleteFloreria);
exports.default = router;
