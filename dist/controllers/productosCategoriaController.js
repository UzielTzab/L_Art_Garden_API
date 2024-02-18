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
exports.deleteProductosCategoria = exports.createProductosCategoria = exports.getAllProductosCategoria = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de productos_categoria
const getAllProductosCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Productos_Categoria');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de productos_categoria', error });
    }
});
exports.getAllProductosCategoria = getAllProductosCategoria;
// Crear un nuevo registro de productos_categoria
const createProductosCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoRegistro = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Productos', nuevoRegistro.Id_Productos)
            .input('Id_Categoria', nuevoRegistro.Id_Categoria)
            .query('INSERT INTO Productos_Categoria (Id_Productos, Id_Categoria) VALUES (@Id_Productos, @Id_Categoria)');
        res.status(201).json({ message: 'Registro de productos_categoria creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de productos_categoria', error });
    }
});
exports.createProductosCategoria = createProductosCategoria;
// Eliminar un registro de productos_categoria
const deleteProductosCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_productos, id_categoria } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id_productos', id_productos)
            .input('id_categoria', id_categoria)
            .query('DELETE FROM Productos_Categoria WHERE Id_Productos = @id_productos AND Id_Categoria = @id_categoria');
        res.json({ message: 'Registro de productos_categoria eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de productos_categoria', error });
    }
});
exports.deleteProductosCategoria = deleteProductosCategoria;
