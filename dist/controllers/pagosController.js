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
exports.deletePago = exports.updatePago = exports.createPago = exports.getAllPagos = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los pagos
const getAllPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM Pagos');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener pagos', error });
    }
});
exports.getAllPagos = getAllPagos;
// Crear un nuevo pago
const createPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoPago = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDPedido', nuevoPago.IDPedido)
            .input('MetodoPago', nuevoPago.MetodoPago)
            .input('FechaHoraPago', nuevoPago.FechaHoraPago)
            .input('MontoTotalPago', nuevoPago.MontoTotalPago)
            .input('EstadoPago', nuevoPago.EstadoPago)
            .query('INSERT INTO Pagos (IDPedido, MetodoPago, FechaHoraPago, MontoTotalPago, EstadoPago) VALUES (@IDPedido, @MetodoPago, @FechaHoraPago, @MontoTotalPago, @EstadoPago)');
        res.status(201).json({ message: 'Pago creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear pago', error });
    }
});
exports.createPago = createPago;
// Actualizar un pago
const updatePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedPago = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDPago', id)
            .input('IDPedido', updatedPago.IDPedido)
            .input('MetodoPago', updatedPago.MetodoPago)
            .input('FechaHoraPago', updatedPago.FechaHoraPago)
            .input('MontoTotalPago', updatedPago.MontoTotalPago)
            .input('EstadoPago', updatedPago.EstadoPago)
            .query('UPDATE Pagos SET IDPedido = @IDPedido, MetodoPago = @MetodoPago, FechaHoraPago = @FechaHoraPago, MontoTotalPago = @MontoTotalPago, EstadoPago = @EstadoPago WHERE IDPago = @IDPago');
        res.json({ message: 'Pago actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar pago', error });
    }
});
exports.updatePago = updatePago;
// Eliminar un pago
const deletePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDPago', id)
            .query('DELETE FROM Pagos WHERE IDPago = @IDPago');
        res.json({ message: 'Pago eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar pago', error });
    }
});
exports.deletePago = deletePago;
