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
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategoriaById = exports.getAllCategorias = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todas las categorias
const getAllCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Categoria');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener categorias', error });
    }
});
exports.getAllCategorias = getAllCategorias;
// Obtener una categoria por su Id
const getCategoriaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request()
            .input('id', id)
            .query('SELECT * FROM Categoria WHERE Id_Categoria = @id');
        if (result.recordset.length === 0) {
            res.status(404).json({ message: 'Categoria no encontrada' });
        }
        else {
            res.json(result.recordset[0]);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener categoria', error });
    }
});
exports.getCategoriaById = getCategoriaById;
// Crear una nueva categoria
const createCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaCategoria = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Nombre', nuevaCategoria.Nombre)
            .query('INSERT INTO Categoria (Nombre) VALUES (@Nombre)');
        res.status(201).json({ message: 'Categoria creada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear categoria', error });
    }
});
exports.createCategoria = createCategoria;
// Actualizar una categoria
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedCategoria = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Nombre', updatedCategoria.Nombre)
            .query('UPDATE Categoria SET Nombre = @Nombre WHERE Id_Categoria = @id');
        res.json({ message: 'Categoria actualizada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar categoria', error });
    }
});
exports.updateCategoria = updateCategoria;
// Eliminar una categoria
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Categoria WHERE Id_Categoria = @id');
        res.json({ message: 'Categoria eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar categoria', error });
    }
});
exports.deleteCategoria = deleteCategoria;
