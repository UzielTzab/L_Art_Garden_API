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
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductoById = exports.getAllProductos = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los productos
const getAllProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Productos');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});
exports.getAllProductos = getAllProductos;
// Obtener un producto por ID
const getProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request()
            .input('id', id)
            .query('SELECT * FROM Productos WHERE id_Productos = @id');
        res.json(result.recordset[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener producto', error });
    }
});
exports.getProductoById = getProductoById;
// Crear un nuevo producto
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoProducto = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Inventario', nuevoProducto.Id_Inventario)
            .input('Imagen', nuevoProducto.Imagen)
            .input('Nombre', nuevoProducto.Nombre)
            .input('Precio', nuevoProducto.Precio)
            .input('Descripcion', nuevoProducto.Descripcion)
            .query('INSERT INTO Productos (Id_Inventario, Imagen, Nombre, Precio, Descripcion) VALUES (@Id_Inventario, @Imagen, @Nombre, @Precio, @Descripcion)');
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
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Id_Inventario', updatedProducto.Id_Inventario)
            .input('Imagen', updatedProducto.Imagen)
            .input('Nombre', updatedProducto.Nombre)
            .input('Precio', updatedProducto.Precio)
            .input('Descripcion', updatedProducto.Descripcion)
            .query('UPDATE Productos SET Id_Inventario = @Id_Inventario, Imagen = @Imagen, Nombre = @Nombre, Precio = @Precio, Descripcion = @Descripcion WHERE id_Productos = @id');
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
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Productos WHERE id_Productos = @id');
        res.json({ message: 'Producto eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error });
    }
});
exports.deleteProducto = deleteProducto;
