"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoriaProducto = exports.updateCategoriaProducto = exports.createCategoriaProducto = exports.getAllCategoriasProductos = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todas las categorías de productos
const getAllCategoriasProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM CategoriasProductos');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías de productos', error });
    }
});
exports.getAllCategoriasProductos = getAllCategoriasProductos;
// Crear una nueva categoría de producto
const createCategoriaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaCategoriaProducto = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('NombreCategoria', nuevaCategoriaProducto.NombreCategoria)
            .input('Descripcion', nuevaCategoriaProducto.Descripcion)
            .query('INSERT INTO CategoriasProductos (NombreCategoria, Descripcion) VALUES (@NombreCategoria, @Descripcion)');
        res.status(201).json({ message: 'Categoría de producto creada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear categoría de producto', error });
    }
});
exports.createCategoriaProducto = createCategoriaProducto;
// Actualizar una categoría de producto
const updateCategoriaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedCategoriaProducto = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('ID', id)
            .input('NombreCategoria', updatedCategoriaProducto.NombreCategoria)
            .input('Descripcion', updatedCategoriaProducto.Descripcion)
            .query('UPDATE CategoriasProductos SET NombreCategoria = @NombreCategoria, Descripcion = @Descripcion WHERE ID = @ID');
        res.json({ message: 'Categoría de producto actualizada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar categoría de producto', error });
    }
});
exports.updateCategoriaProducto = updateCategoriaProducto;
// Eliminar una categoría de producto
const deleteCategoriaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('ID', id)
            .query('DELETE FROM CategoriasProductos WHERE ID = @ID');
        res.json({ message: 'Categoría de producto eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar categoría de producto', error });
    }
});
exports.deleteCategoriaProducto = deleteCategoriaProducto;
