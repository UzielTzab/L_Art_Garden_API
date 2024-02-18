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
exports.deleteDevolucion = exports.updateDevolucion = exports.createDevolucion = exports.getAllDevolucion = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Devolucion
const getAllDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Devolucion');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Devolucion', error });
    }
});
exports.getAllDevolucion = getAllDevolucion;
// Crear un nuevo registro de Devolucion
const createDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaDevolucion = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Proceso', nuevaDevolucion.Proceso)
            .query('INSERT INTO Devolucion (Proceso) VALUES (@Proceso)');
        res.status(201).json({ message: 'Registro de Devolucion creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Devolucion', error });
    }
});
exports.createDevolucion = createDevolucion;
// Actualizar un registro de Devolucion
const updateDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedDevolucion = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Proceso', updatedDevolucion.Proceso)
            .query('UPDATE Devolucion SET Proceso = @Proceso WHERE Id_Devolucion = @id');
        res.json({ message: 'Registro de Devolucion actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Devolucion', error });
    }
});
exports.updateDevolucion = updateDevolucion;
// Eliminar un registro de Devolucion
const deleteDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Devolucion WHERE Id_Devolucion = @id');
        res.json({ message: 'Registro de Devolucion eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Devolucion', error });
    }
});
exports.deleteDevolucion = deleteDevolucion;
