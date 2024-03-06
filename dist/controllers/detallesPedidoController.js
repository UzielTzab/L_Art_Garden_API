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
exports.deleteDetallePedido = exports.updateDetallePedido = exports.createDetallePedido = exports.getAllDetallesPedido = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los detalles de pedido
const getAllDetallesPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM DetallesPedido');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener detalles de pedido', error });
    }
});
exports.getAllDetallesPedido = getAllDetallesPedido;
// Crear un nuevo detalle de pedido
const createDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoDetallePedido = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDPedido', nuevoDetallePedido.IDPedido)
            .input('IDProducto', nuevoDetallePedido.IDProducto)
            .input('Cantidad', nuevoDetallePedido.Cantidad)
            .input('PrecioUnitario', nuevoDetallePedido.PrecioUnitario)
            .input('Subtotal', nuevoDetallePedido.Subtotal)
            .query('INSERT INTO DetallesPedido (IDPedido, IDProducto, Cantidad, PrecioUnitario, Subtotal) VALUES (@IDPedido, @IDProducto, @Cantidad, @PrecioUnitario, @Subtotal)');
        res.status(201).json({ message: 'Detalle de pedido creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear detalle de pedido', error });
    }
});
exports.createDetallePedido = createDetallePedido;
// Actualizar un detalle de pedido
const updateDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const nuevoDetallePedido = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDPedido', nuevoDetallePedido.IDPedido)
            .input('IDProducto', nuevoDetallePedido.IDProducto)
            .input('Cantidad', nuevoDetallePedido.Cantidad)
            .input('PrecioUnitario', nuevoDetallePedido.PrecioUnitario)
            .input('Subtotal', nuevoDetallePedido.Subtotal)
            .query('INSERT INTO DetallesPedido (IDPedido, IDProducto, Cantidad, PrecioUnitario, Subtotal) VALUES (@IDPedido, @IDProducto, @Cantidad, @PrecioUnitario, @Subtotal)');
        res.json({ message: 'Detalle de pedido actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar detalle de pedido', error });
    }
});
exports.updateDetallePedido = updateDetallePedido;
// Eliminar un detalle de pedido
const deleteDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDDetalle', id)
            .query('DELETE FROM DetallesPedido WHERE IDDetalle = @IDDetalle');
        res.json({ message: 'Detalle de pedido eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar detalle de pedido', error });
    }
});
exports.deleteDetallePedido = deleteDetallePedido;
