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
exports.deleteCompra = exports.updateCompra = exports.createCompra = exports.getAllCompra = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Compra
const getAllCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Compra');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Compra', error });
    }
});
exports.getAllCompra = getAllCompra;
// Crear un nuevo registro de Compra
const createCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaCompra = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Carrito', nuevaCompra.Id_Carrito)
            .input('Id_Pago', nuevaCompra.Id_Pago)
            .input('Nombre', nuevaCompra.Nombre)
            .input('Telefono', nuevaCompra.Telefono)
            .input('Correo_Electronico', nuevaCompra.Correo_Electronico)
            .input('Descripcion', nuevaCompra.Descripcion)
            .input('Recoger_Tienda', nuevaCompra.Recoger_Tienda)
            .input('Fecha_Entrega', nuevaCompra.Fecha_Entrega)
            .input('Horario', nuevaCompra.Horario)
            .query('INSERT INTO Compra (Id_Carrito, Id_Pago, Nombre, Telefono, Correo_Electronico, Descripcion, Recoger_Tienda, Fecha_Entrega, Horario) VALUES (@Id_Carrito, @Id_Pago, @Nombre, @Telefono, @Correo_Electronico, @Descripcion, @Recoger_Tienda, @Fecha_Entrega, @Horario)');
        res.status(201).json({ message: 'Registro de Compra creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Compra', error });
    }
});
exports.createCompra = createCompra;
// Actualizar un registro de Compra
const updateCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedCompra = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Id_Carrito', updatedCompra.Id_Carrito)
            .input('Id_Pago', updatedCompra.Id_Pago)
            .input('Nombre', updatedCompra.Nombre)
            .input('Telefono', updatedCompra.Telefono)
            .input('Correo_Electronico', updatedCompra.Correo_Electronico)
            .input('Descripcion', updatedCompra.Descripcion)
            .input('Recoger_Tienda', updatedCompra.Recoger_Tienda)
            .input('Fecha_Entrega', updatedCompra.Fecha_Entrega)
            .input('Horario', updatedCompra.Horario)
            .query('UPDATE Compra SET Id_Carrito = @Id_Carrito, Id_Pago = @Id_Pago, Nombre = @Nombre, Telefono = @Telefono, Correo_Electronico = @Correo_Electronico, Descripcion = @Descripcion, Recoger_Tienda = @Recoger_Tienda, Fecha_Entrega = @Fecha_Entrega, Horario = @Horario WHERE Id_Compra = @id');
        res.json({ message: 'Registro de Compra actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Compra', error });
    }
});
exports.updateCompra = updateCompra;
// Eliminar un registro de Compra
const deleteCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Compra WHERE Id_Compra = @id');
        res.json({ message: 'Registro de Compra eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Compra', error });
    }
});
exports.deleteCompra = deleteCompra;
