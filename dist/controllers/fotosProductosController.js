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
exports.deleteFotoProducto = exports.createFotoProducto = exports.getFotosProducto = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todas las fotos de un producto
const getFotosProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProducto } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDProducto', idProducto)
            .query('SELECT * FROM FotosProductos WHERE IDProducto = @IDProducto');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener fotos de producto', error });
    }
});
exports.getFotosProducto = getFotosProducto;
// Crear una nueva foto para un producto
const createFotoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaFoto = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDProducto', nuevaFoto.IDProducto)
            .input('Foto', nuevaFoto.Foto)
            .query('INSERT INTO FotosProductos (IDProducto, Foto) VALUES (@IDProducto, @Foto)');
        res.status(201).json({ message: 'Foto de producto creada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear foto de producto', error });
    }
});
exports.createFotoProducto = createFotoProducto;
// Eliminar una foto de un producto
const deleteFotoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idFoto } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDFoto', idFoto)
            .query('DELETE FROM FotosProductos WHERE IDFoto = @IDFoto');
        res.json({ message: 'Foto de producto eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar foto de producto', error });
    }
});
exports.deleteFotoProducto = deleteFotoProducto;
