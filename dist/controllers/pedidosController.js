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
exports.deletePedido = exports.updatePedido = exports.createPedido = exports.getAllPedidos = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los pedidos
const getAllPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield dbConfig_1.poolExport.connect();
        const result = yield pool.request().query('SELECT * FROM Pedidos');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener pedidos', error });
    }
});
exports.getAllPedidos = getAllPedidos;
// Crear un nuevo pedido
const createPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoPedido = req.body;
    try {
        const pool = yield dbConfig_1.poolExport.connect();
        yield pool.request()
            .input('IDUsuarioCliente', nuevoPedido.IDUsuarioCliente)
            .input('IDUsuarioVendedor', nuevoPedido.IDUsuarioVendedor)
            .input('FechaHoraPedido', nuevoPedido.FechaHoraPedido)
            .input('EstadoPedido', nuevoPedido.EstadoPedido)
            .query('INSERT INTO Pedidos (IDUsuarioCliente, IDUsuarioVendedor, FechaHoraPedido, EstadoPedido) VALUES (@IDUsuarioCliente, @IDUsuarioVendedor, @FechaHoraPedido, @EstadoPedido)');
        res.status(201).json({ message: 'Pedido creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear pedido', error });
    }
});
exports.createPedido = createPedido;
// Actualizar un pedido
const updatePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedPedido = req.body;
    try {
        const pool = yield dbConfig_1.poolExport.connect();
        yield pool.request()
            .input('IDPedido', id)
            .input('IDUsuarioCliente', updatedPedido.IDUsuarioCliente)
            .input('IDUsuarioVendedor', updatedPedido.IDUsuarioVendedor)
            .input('FechaHoraPedido', updatedPedido.FechaHoraPedido)
            .input('EstadoPedido', updatedPedido.EstadoPedido)
            .query('UPDATE Pedidos SET IDUsuarioCliente = @IDUsuarioCliente, IDUsuarioVendedor = @IDUsuarioVendedor, FechaHoraPedido = @FechaHoraPedido, EstadoPedido = @EstadoPedido WHERE IDPedido = @IDPedido');
        res.json({ message: 'Pedido actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar pedido', error });
    }
});
exports.updatePedido = updatePedido;
// Eliminar un pedido
const deletePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pool = yield dbConfig_1.poolExport.connect();
        yield pool.request()
            .input('IDPedido', id)
            .query('DELETE FROM Pedidos WHERE IDPedido = @IDPedido');
        res.json({ message: 'Pedido eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar pedido', error });
    }
});
exports.deletePedido = deletePedido;
