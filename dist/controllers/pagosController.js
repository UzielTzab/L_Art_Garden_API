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
            .input('IDUsuario', nuevoPago.IDUsuario)
            .input('IDPedido', nuevoPago.IDPedido)
            .input('IDMetodo', nuevoPago.IDMetodo)
            .input('FechaHoraPago', nuevoPago.FechaHoraPago)
            .input('MontoTotalPagado', nuevoPago.MontoTotalPagado)
            .input('IDEstado', nuevoPago.IDEstado)
            .query('INSERT INTO Pagos (IDUsuario, IDPedido, IDMetodo, FechaHoraPago, MontoTotalPagado, IDEstado) VALUES (@IDUsuario, @IDPedido, @IDMetodo, @FechaHoraPago, @MontoTotalPagado, @IDEstado)');
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
            .input('IDUsuario', updatedPago.IDUsuario)
            .input('IDPedido', updatedPago.IDPedido)
            .input('IDMetodo', updatedPago.IDMetodo)
            .input('FechaHoraPago', updatedPago.FechaHoraPago)
            .input('MontoTotalPagado', updatedPago.MontoTotalPagado)
            .input('IDEstado', updatedPago.IDEstado)
            .query('UPDATE Pagos SET IDUsuario = @IDUsuario, IDPedido = @IDPedido, IDMetodo = @IDMetodo, FechaHoraPago = @FechaHoraPago, MontoTotalPagado = @MontoTotalPagado, IDEstado = @IDEstado WHERE IDPago = @IDPago');
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
