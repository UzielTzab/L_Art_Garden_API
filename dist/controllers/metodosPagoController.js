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
exports.deleteMetodoPago = exports.updateMetodoPago = exports.createMetodoPago = exports.getAllMetodosPago = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los métodos de pago
const getAllMetodosPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM MetodosPago');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener métodos de pago', error });
    }
});
exports.getAllMetodosPago = getAllMetodosPago;
// Crear un nuevo método de pago
const createMetodoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoMetodoPago = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuario', nuevoMetodoPago.IDUsuario)
            .input('NumeroTarjeta', nuevoMetodoPago.NumeroTarjeta)
            .input('Nombre', nuevoMetodoPago.Nombre)
            .input('Apellido', nuevoMetodoPago.Apellido)
            .input('Expiracion', nuevoMetodoPago.Expiracion)
            .input('CodigoSeguridad', nuevoMetodoPago.CodigoSeguridad)
            .query('INSERT INTO MetodosPago (IDUsuario, NumeroTarjeta, Nombre, Apellido, Expiracion, CodigoSeguridad) VALUES (@IDUsuario, @NumeroTarjeta, @Nombre, @Apellido, @Expiracion, @CodigoSeguridad)');
        res.status(201).json({ message: 'Método de pago creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear método de pago', error });
    }
});
exports.createMetodoPago = createMetodoPago;
// Actualizar un método de pago
const updateMetodoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedMetodoPago = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDMetodo', id)
            .input('IDUsuario', updatedMetodoPago.IDUsuario)
            .input('NumeroTarjeta', updatedMetodoPago.NumeroTarjeta)
            .input('Nombre', updatedMetodoPago.Nombre)
            .input('Apellido', updatedMetodoPago.Apellido)
            .input('Expiracion', updatedMetodoPago.Expiracion)
            .input('CodigoSeguridad', updatedMetodoPago.CodigoSeguridad)
            .query('UPDATE MetodosPago SET IDUsuario = @IDUsuario, NumeroTarjeta = @NumeroTarjeta, Nombre = @Nombre, Apellido = @Apellido, Expiracion = @Expiracion, CodigoSeguridad = @CodigoSeguridad WHERE IDMetodo = @IDMetodo');
        res.json({ message: 'Método de pago actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar método de pago', error });
    }
});
exports.updateMetodoPago = updateMetodoPago;
// Eliminar un método de pago
const deleteMetodoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDMetodo', id)
            .query('DELETE FROM MetodosPago WHERE IDMetodo = @IDMetodo');
        res.json({ message: 'Método de pago eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar método de pago', error });
    }
});
exports.deleteMetodoPago = deleteMetodoPago;
