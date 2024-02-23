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
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getAllProductos = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los productos
const getAllProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM Productos');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});
exports.getAllProductos = getAllProductos;
// Crear un nuevo producto
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoProducto = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDCategoria', nuevoProducto.IDCategoria)
            .input('IDInventario', nuevoProducto.IDInventario)
            .input('NombreProducto', nuevoProducto.NombreProducto)
            .input('Descripcion', nuevoProducto.Descripcion)
            .input('Precio', nuevoProducto.Precio)
            .input('Imagen', nuevoProducto.Imagen)
            .query('INSERT INTO Productos (IDCategoria, IDInventario, NombreProducto, Descripcion, Precio, Imagen) VALUES (@IDCategoria, @IDInventario, @NombreProducto, @Descripcion, @Precio, @Imagen)');
        res.status(201).json({ message: 'Producto creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error });
    }
});
exports.createProducto = createProducto;
// Actualizar un producto
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedProducto = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDProducto', id)
            .input('IDCategoria', updatedProducto.IDCategoria)
            .input('IDInventario', updatedProducto.IDInventario)
            .input('NombreProducto', updatedProducto.NombreProducto)
            .input('Descripcion', updatedProducto.Descripcion)
            .input('Precio', updatedProducto.Precio)
            .input('Imagen', updatedProducto.Imagen)
            .query('UPDATE Productos SET IDCategoria = @IDCategoria, IDInventario = @IDInventario, NombreProducto = @NombreProducto, Descripcion = @Descripcion, Precio = @Precio, Imagen = @Imagen WHERE IDProducto = @IDProducto');
        res.json({ message: 'Producto actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error });
    }
});
exports.updateProducto = updateProducto;
// Eliminar un producto
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDProducto', id)
            .query('DELETE FROM Productos WHERE IDProducto = @IDProducto');
        res.json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error });
    }
});
exports.deleteProducto = deleteProducto;
