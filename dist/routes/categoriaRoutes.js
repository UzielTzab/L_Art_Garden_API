"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriaController_1 = require("../controllers/categoriaController");
const router = express_1.default.Router();
// Rutas CRUD para Categoria
router.get('/categoria', categoriaController_1.getAllCategorias);
router.get('/categoria/:id', categoriaController_1.getCategoriaById);
router.post('/categoria', categoriaController_1.createCategoria);
router.put('/categoria/:id', categoriaController_1.updateCategoria);
router.delete('/categoria/:id', categoriaController_1.deleteCategoria);
exports.default = router;
