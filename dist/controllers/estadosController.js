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
exports.deleteEstado = exports.updateEstado = exports.createEstado = exports.getAllEstados = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los estados
const getAllEstados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM Estados');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener estados', error });
    }
});
exports.getAllEstados = getAllEstados;
// Crear un nuevo estado
const createEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoEstado = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('Estado', nuevoEstado.Estado)
            .query('INSERT INTO Estados (Estado) VALUES (@Estado)');
        res.status(201).json({ message: 'Estado creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear estado', error });
    }
});
exports.createEstado = createEstado;
// Actualizar un estado
const updateEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedEstado = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDEstado', id)
            .input('Estado', updatedEstado.Estado)
            .query('UPDATE Estados SET Estado = @Estado WHERE IDEstado = @IDEstado');
        res.json({ message: 'Estado actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar estado', error });
    }
});
exports.updateEstado = updateEstado;
// Eliminar un estado
const deleteEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDEstado', id)
            .query('DELETE FROM Estados WHERE IDEstado = @IDEstado');
        res.json({ message: 'Estado eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar estado', error });
    }
});
exports.deleteEstado = deleteEstado;
