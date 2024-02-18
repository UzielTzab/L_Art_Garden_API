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
exports.deleteCarrito = exports.updateCarrito = exports.createCarrito = exports.getAllCarrito = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Carrito
const getAllCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Carrito');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Carrito', error });
    }
});
exports.getAllCarrito = getAllCarrito;
// Crear un nuevo registro de Carrito
const createCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoCarrito = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Nombre', nuevoCarrito.Nombre)
            .query('INSERT INTO Carrito (Nombre) VALUES (@Nombre)');
        res.status(201).json({ message: 'Registro de Carrito creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Carrito', error });
    }
});
exports.createCarrito = createCarrito;
// Actualizar un registro de Carrito
const updateCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedCarrito = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Nombre', updatedCarrito.Nombre)
            .query('UPDATE Carrito SET Nombre = @Nombre WHERE Id_Carrito = @id');
        res.json({ message: 'Registro de Carrito actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Carrito', error });
    }
});
exports.updateCarrito = updateCarrito;
// Eliminar un registro de Carrito
const deleteCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Carrito WHERE Id_Carrito = @id');
        res.json({ message: 'Registro de Carrito eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Carrito', error });
    }
});
exports.deleteCarrito = deleteCarrito;
