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
// Obtener todos los registros de Pedidos
const getAllPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Pedidos');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Pedidos', error });
    }
});
exports.getAllPedidos = getAllPedidos;
// Crear un nuevo registro de Pedidos
const createPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoPedido = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Compra', nuevoPedido.Id_Compra)
            .input('Proceso', nuevoPedido.Proceso)
            .input('Motivo_Cancelacion', nuevoPedido.Motivo_Cancelacion)
            .input('Motivo_Devolucion', nuevoPedido.Motivo_Devolucion)
            .input('Imagen', nuevoPedido.Imagen)
            .query('INSERT INTO Pedidos (Id_Compra, Proceso, Motivo_Cancelacion, Motivo_Devolucion, Imagen) VALUES (@Id_Compra, @Proceso, @Motivo_Cancelacion, @Motivo_Devolucion, @Imagen)');
        res.status(201).json({ message: 'Registro de Pedidos creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Pedidos', error });
    }
});
exports.createPedido = createPedido;
// Actualizar un registro de Pedidos
const updatePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedPedido = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Id_Compra', updatedPedido.Id_Compra)
            .input('Proceso', updatedPedido.Proceso)
            .input('Motivo_Cancelacion', updatedPedido.Motivo_Cancelacion)
            .input('Motivo_Devolucion', updatedPedido.Motivo_Devolucion)
            .input('Imagen', updatedPedido.Imagen)
            .query('UPDATE Pedidos SET Id_Compra = @Id_Compra, Proceso = @Proceso, Motivo_Cancelacion = @Motivo_Cancelacion, Motivo_Devolucion = @Motivo_Devolucion, Imagen = @Imagen WHERE Id_Pedidos = @id');
        res.json({ message: 'Registro de Pedidos actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Pedidos', error });
    }
});
exports.updatePedido = updatePedido;
// Eliminar un registro de Pedidos
const deletePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Pedidos WHERE Id_Pedidos = @id');
        res.json({ message: 'Registro de Pedidos eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Pedidos', error });
    }
});
exports.deletePedido = deletePedido;
