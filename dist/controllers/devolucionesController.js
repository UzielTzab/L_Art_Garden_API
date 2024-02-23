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
exports.deleteDevolucion = exports.updateDevolucion = exports.createDevolucion = exports.getAllDevoluciones = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todas las devoluciones
const getAllDevoluciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM Devoluciones');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener devoluciones', error });
    }
});
exports.getAllDevoluciones = getAllDevoluciones;
// Crear una nueva devolución
const createDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaDevolucion = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDPedidoDevolucion', nuevaDevolucion.IDPedidoDevolucion)
            .input('FechaHoraDevolucion', nuevaDevolucion.FechaHoraDevolucion)
            .input('MotivoDevolucion', nuevaDevolucion.MotivoDevolucion)
            .input('EstadoDevolucion', nuevaDevolucion.EstadoDevolucion)
            .query('INSERT INTO Devoluciones (IDPedidoDevolucion, FechaHoraDevolucion, MotivoDevolucion, EstadoDevolucion) VALUES (@IDPedidoDevolucion, @FechaHoraDevolucion, @MotivoDevolucion, @EstadoDevolucion)');
        res.status(201).json({ message: 'Devolución creada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear devolución', error });
    }
});
exports.createDevolucion = createDevolucion;
// Actualizar una devolución
const updateDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedDevolucion = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDDevolucion', id)
            .input('IDPedidoDevolucion', updatedDevolucion.IDPedidoDevolucion)
            .input('FechaHoraDevolucion', updatedDevolucion.FechaHoraDevolucion)
            .input('MotivoDevolucion', updatedDevolucion.MotivoDevolucion)
            .input('EstadoDevolucion', updatedDevolucion.EstadoDevolucion)
            .query('UPDATE Devoluciones SET IDPedidoDevolucion = @IDPedidoDevolucion, FechaHoraDevolucion = @FechaHoraDevolucion, MotivoDevolucion = @MotivoDevolucion, EstadoDevolucion = @EstadoDevolucion WHERE IDDevolucion = @IDDevolucion');
        res.json({ message: 'Devolución actualizada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar devolución', error });
    }
});
exports.updateDevolucion = updateDevolucion;
// Eliminar una devolución
const deleteDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDDevolucion', id)
            .query('DELETE FROM Devoluciones WHERE IDDevolucion = @IDDevolucion');
        res.json({ message: 'Devolución eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar devolución', error });
    }
});
exports.deleteDevolucion = deleteDevolucion;
