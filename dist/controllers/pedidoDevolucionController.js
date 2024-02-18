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
exports.deletePedidoDevolucion = exports.createPedidoDevolucion = exports.getAllPedidosDevolucion = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Pedidos_Devolucion
const getAllPedidosDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Pedidos_Devolucion');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Pedidos_Devolucion', error });
    }
});
exports.getAllPedidosDevolucion = getAllPedidosDevolucion;
// Crear un nuevo registro de Pedidos_Devolucion
const createPedidoDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoPedidoDevolucion = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Pedidos', nuevoPedidoDevolucion.Id_Pedidos)
            .input('Id_Devolucion', nuevoPedidoDevolucion.Id_Devolucion)
            .query('INSERT INTO Pedidos_Devolucion (Id_Pedidos, Id_Devolucion) VALUES (@Id_Pedidos, @Id_Devolucion)');
        res.status(201).json({ message: 'Registro de Pedidos_Devolucion creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Pedidos_Devolucion', error });
    }
});
exports.createPedidoDevolucion = createPedidoDevolucion;
// Eliminar un registro de Pedidos_Devolucion
const deletePedidoDevolucion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pedidos, id_devolucion } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id_pedidos', id_pedidos)
            .input('id_devolucion', id_devolucion)
            .query('DELETE FROM Pedidos_Devolucion WHERE Id_Pedidos = @id_pedidos AND Id_Devolucion = @id_devolucion');
        res.json({ message: 'Registro de Pedidos_Devolucion eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Pedidos_Devolucion', error });
    }
});
exports.deletePedidoDevolucion = deletePedidoDevolucion;
