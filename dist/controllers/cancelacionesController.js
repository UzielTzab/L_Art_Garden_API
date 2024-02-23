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
exports.deleteCancelacion = exports.updateCancelacion = exports.createCancelacion = exports.getAllCancelaciones = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todas las cancelaciones
const getAllCancelaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM Cancelaciones');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener cancelaciones', error });
    }
});
exports.getAllCancelaciones = getAllCancelaciones;
// Crear una nueva cancelación
const createCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaCancelacion = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDPedidoCancelado', nuevaCancelacion.IDPedidoCancelado)
            .input('FechaHoraCancelacion', nuevaCancelacion.FechaHoraCancelacion)
            .input('MotivoCancelacion', nuevaCancelacion.MotivoCancelacion)
            .input('EstadoCancelacion', nuevaCancelacion.EstadoCancelacion)
            .query('INSERT INTO Cancelaciones (IDPedidoCancelado, FechaHoraCancelacion, MotivoCancelacion, EstadoCancelacion) VALUES (@IDPedidoCancelado, @FechaHoraCancelacion, @MotivoCancelacion, @EstadoCancelacion)');
        res.status(201).json({ message: 'Cancelación creada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear cancelación', error });
    }
});
exports.createCancelacion = createCancelacion;
// Actualizar una cancelación
const updateCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedCancelacion = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDCancelacion', id)
            .input('IDPedidoCancelado', updatedCancelacion.IDPedidoCancelado)
            .input('FechaHoraCancelacion', updatedCancelacion.FechaHoraCancelacion)
            .input('MotivoCancelacion', updatedCancelacion.MotivoCancelacion)
            .input('EstadoCancelacion', updatedCancelacion.EstadoCancelacion)
            .query('UPDATE Cancelaciones SET IDPedidoCancelado = @IDPedidoCancelado, FechaHoraCancelacion = @FechaHoraCancelacion, MotivoCancelacion = @MotivoCancelacion, EstadoCancelacion = @EstadoCancelacion WHERE IDCancelacion = @IDCancelacion');
        res.json({ message: 'Cancelación actualizada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar cancelación', error });
    }
});
exports.updateCancelacion = updateCancelacion;
// Eliminar una cancelación
const deleteCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDCancelacion', id)
            .query('DELETE FROM Cancelaciones WHERE IDCancelacion = @IDCancelacion');
        res.json({ message: 'Cancelación eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar cancelación', error });
    }
});
exports.deleteCancelacion = deleteCancelacion;
