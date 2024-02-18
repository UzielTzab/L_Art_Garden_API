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
exports.deleteInventario = exports.updateInventario = exports.createInventario = exports.getAllInventario = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Inventario
const getAllInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Inventario');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Inventario', error });
    }
});
exports.getAllInventario = getAllInventario;
// Crear un nuevo registro de Inventario
const createInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoInventario = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Inventario', nuevoInventario.Id_Inventario)
            .query('INSERT INTO Inventario (Id_Inventario) VALUES (@Id_Inventario)');
        res.status(201).json({ message: 'Registro de Inventario creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Inventario', error });
    }
});
exports.createInventario = createInventario;
// Actualizar un registro de Inventario
const updateInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedInventario = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Id_Inventario', updatedInventario.Id_Inventario)
            .query('UPDATE Inventario SET Id_Inventario = @Id_Inventario WHERE Id_Inventario = @id');
        res.json({ message: 'Registro de Inventario actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Inventario', error });
    }
});
exports.updateInventario = updateInventario;
// Eliminar un registro de Inventario
const deleteInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Inventario WHERE Id_Inventario = @id');
        res.json({ message: 'Registro de Inventario eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Inventario', error });
    }
});
exports.deleteInventario = deleteInventario;
