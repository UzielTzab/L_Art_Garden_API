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
exports.deleteCarritoProducto = exports.createCarritoProducto = exports.getAllCarritoProductos = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Carrito_Productos
const getAllCarritoProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Carrito_Productos');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Carrito_Productos', error });
    }
});
exports.getAllCarritoProductos = getAllCarritoProductos;
// Crear un nuevo registro de Carrito_Productos
const createCarritoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoCarritoProducto = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Carrito', nuevoCarritoProducto.Id_Carrito)
            .input('Id_Producto', nuevoCarritoProducto.Id_Producto)
            .query('INSERT INTO Carrito_Productos (Id_Carrito, Id_Producto) VALUES (@Id_Carrito, @Id_Producto)');
        res.status(201).json({ message: 'Registro de Carrito_Productos creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Carrito_Productos', error });
    }
});
exports.createCarritoProducto = createCarritoProducto;
// Eliminar un registro de Carrito_Productos
const deleteCarritoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCarrito, idProducto } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('idCarrito', idCarrito)
            .input('idProducto', idProducto)
            .query('DELETE FROM Carrito_Productos WHERE Id_Carrito = @idCarrito AND Id_Producto = @idProducto');
        res.json({ message: 'Registro de Carrito_Productos eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Carrito_Productos', error });
    }
});
exports.deleteCarritoProducto = deleteCarritoProducto;
