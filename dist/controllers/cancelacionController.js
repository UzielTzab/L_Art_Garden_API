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
exports.deleteCancelacion = exports.updateCancelacion = exports.createCancelacion = exports.getAllCancelacion = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Cancelacion
const getAllCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Cancelacion');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Cancelacion', error });
    }
});
exports.getAllCancelacion = getAllCancelacion;
// Crear un nuevo registro de Cancelacion
const createCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaCancelacion = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Proceso', nuevaCancelacion.Proceso)
            .query('INSERT INTO Cancelacion (Proceso) VALUES (@Proceso)');
        res.status(201).json({ message: 'Registro de Cancelacion creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Cancelacion', error });
    }
});
exports.createCancelacion = createCancelacion;
// Actualizar un registro de Cancelacion
const updateCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedCancelacion = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Proceso', updatedCancelacion.Proceso)
            .query('UPDATE Cancelacion SET Proceso = @Proceso WHERE Id_Cancelacion = @id');
        res.json({ message: 'Registro de Cancelacion actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Cancelacion', error });
    }
});
exports.updateCancelacion = updateCancelacion;
// Eliminar un registro de Cancelacion
const deleteCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Cancelacion WHERE Id_Cancelacion = @id');
        res.json({ message: 'Registro de Cancelacion eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Cancelacion', error });
    }
});
exports.deleteCancelacion = deleteCancelacion;
