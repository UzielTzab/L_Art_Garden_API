"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificacionesController_1 = require("../controllers/notificacionesController");
const router = express_1.default.Router();
// Rutas CRUD para Notificaciones
router.get('/notificaciones', notificacionesController_1.getAllNotificaciones);
router.post('/notificaciones', notificacionesController_1.createNotificacion);
router.put('/notificaciones/:id', notificacionesController_1.updateNotificacion);
router.delete('/notificaciones/:id', notificacionesController_1.deleteNotificacion);
exports.default = router;
