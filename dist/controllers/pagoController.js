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
// Obtener todos los registros de Pago
const getAllPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Pago');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Pago', error });
    }
});
exports.getAllPagos = getAllPagos;
// Crear un nuevo registro de Pago
const createPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoPago = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Numero_Tarjeta', nuevoPago.Numero_Tarjeta)
            .input('Fecha_Vencimiento', nuevoPago.Fecha_Vencimiento)
            .input('CSC', nuevoPago.CSC)
            .input('Nombre', nuevoPago.Nombre)
            .input('Apellidos', nuevoPago.Apellidos)
            .input('Direccion', nuevoPago.Direccion)
            .input('Colonia', nuevoPago.Colonia)
            .input('Ciudad', nuevoPago.Ciudad)
            .input('Estado', nuevoPago.Estado)
            .input('Codigo_Postal', nuevoPago.Codigo_Postal)
            .input('Celular', nuevoPago.Celular)
            .input('Correo_Electronico', nuevoPago.Correo_Electronico)
            .query('INSERT INTO Pago (Numero_Tarjeta, Fecha_Vencimiento, CSC, Nombre, Apellidos, Direccion, Colonia, Ciudad, Estado, Codigo_Postal, Celular, Correo_Electronico) VALUES (@Numero_Tarjeta, @Fecha_Vencimiento, @CSC, @Nombre, @Apellidos, @Direccion, @Colonia, @Ciudad, @Estado, @Codigo_Postal, @Celular, @Correo_Electronico)');
        res.status(201).json({ message: 'Registro de Pago creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Pago', error });
    }
});
exports.createPago = createPago;
// Actualizar un registro de Pago
const updatePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedPago = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Numero_Tarjeta', updatedPago.Numero_Tarjeta)
            .input('Fecha_Vencimiento', updatedPago.Fecha_Vencimiento)
            .input('CSC', updatedPago.CSC)
            .input('Nombre', updatedPago.Nombre)
            .input('Apellidos', updatedPago.Apellidos)
            .input('Direccion', updatedPago.Direccion)
            .input('Colonia', updatedPago.Colonia)
            .input('Ciudad', updatedPago.Ciudad)
            .input('Estado', updatedPago.Estado)
            .input('Codigo_Postal', updatedPago.Codigo_Postal)
            .input('Celular', updatedPago.Celular)
            .input('Correo_Electronico', updatedPago.Correo_Electronico)
            .query('UPDATE Pago SET Numero_Tarjeta = @Numero_Tarjeta, Fecha_Vencimiento = @Fecha_Vencimiento, CSC = @CSC, Nombre = @Nombre, Apellidos = @Apellidos, Direccion = @Direccion, Colonia = @Colonia, Ciudad = @Ciudad, Estado = @Estado, Codigo_Postal = @Codigo_Postal, Celular = @Celular, Correo_Electronico = @Correo_Electronico WHERE Id_Pago = @id');
        res.json({ message: 'Registro de Pago actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Pago', error });
    }
});
exports.updatePago = updatePago;
// Eliminar un registro de Pago
const deletePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Pago WHERE Id_Pago = @id');
        res.json({ message: 'Registro de Pago eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Pago', error });
    }
});
exports.deletePago = deletePago;
