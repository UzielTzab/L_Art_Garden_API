"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fotosProductosController_1 = require("../controllers/fotosProductosController");
const router = express_1.default.Router();
// Rutas CRUD para FotosProductos
router.get('/fotos-producto/:idProducto', fotosProductosController_1.getFotosProducto);
router.post('/fotos-producto', fotosProductosController_1.createFotoProducto);
router.delete('/fotos-producto/:idFoto', fotosProductosController_1.deleteFotoProducto);
exports.default = router;
