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
// Obtener todo el inventario
const getAllInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM Inventario');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener inventario', error });
    }
});
exports.getAllInventario = getAllInventario;
// Crear un nuevo registro de inventario
const createInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoInventario = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDFloreria', nuevoInventario.IDFloreria)
            .query('INSERT INTO Inventario (IDFloreria) VALUES (@IDFloreria)');
        res.status(201).json({ message: 'Registro de inventario creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de inventario', error });
    }
});
exports.createInventario = createInventario;
// Actualizar un registro de inventario
const updateInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedInventario = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDInventario', id)
            .input('IDFloreria', updatedInventario.IDFloreria)
            .query('UPDATE Inventario SET IDFloreria = @IDFloreria WHERE IDInventario = @IDInventario');
        res.json({ message: 'Registro de inventario actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de inventario', error });
    }
});
exports.updateInventario = updateInventario;
// Eliminar un registro de inventario
const deleteInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDInventario', id)
            .query('DELETE FROM Inventario WHERE IDInventario = @IDInventario');
        res.json({ message: 'Registro de inventario eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de inventario', error });
    }
});
exports.deleteInventario = deleteInventario;
