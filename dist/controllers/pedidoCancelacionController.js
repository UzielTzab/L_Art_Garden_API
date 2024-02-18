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
exports.deletePedidoCancelacion = exports.createPedidoCancelacion = exports.getAllPedidosCancelacion = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Pedidos_Cancelacion
const getAllPedidosCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Pedidos_Cancelacion');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Pedidos_Cancelacion', error });
    }
});
exports.getAllPedidosCancelacion = getAllPedidosCancelacion;
// Crear un nuevo registro de Pedidos_Cancelacion
const createPedidoCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoPedidoCancelacion = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Pedidos', nuevoPedidoCancelacion.Id_Pedidos)
            .input('Id_Cancelacion', nuevoPedidoCancelacion.Id_Cancelacion)
            .query('INSERT INTO Pedidos_Cancelacion (Id_Pedidos, Id_Cancelacion) VALUES (@Id_Pedidos, @Id_Cancelacion)');
        res.status(201).json({ message: 'Registro de Pedidos_Cancelacion creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Pedidos_Cancelacion', error });
    }
});
exports.createPedidoCancelacion = createPedidoCancelacion;
// Eliminar un registro de Pedidos_Cancelacion
const deletePedidoCancelacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pedidos, id_cancelacion } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id_pedidos', id_pedidos)
            .input('id_cancelacion', id_cancelacion)
            .query('DELETE FROM Pedidos_Cancelacion WHERE Id_Pedidos = @id_pedidos AND Id_Cancelacion = @id_cancelacion');
        res.json({ message: 'Registro de Pedidos_Cancelacion eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Pedidos_Cancelacion', error });
    }
});
exports.deletePedidoCancelacion = deletePedidoCancelacion;
