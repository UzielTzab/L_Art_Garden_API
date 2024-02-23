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
exports.deleteComentarioResenaProducto = exports.updateComentarioResenaProducto = exports.createComentarioResenaProducto = exports.getAllComentariosResenasProductos = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los comentarios y reseñas de productos
const getAllComentariosResenasProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM ComentariosResenasProductos');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener comentarios y reseñas de productos', error });
    }
});
exports.getAllComentariosResenasProductos = getAllComentariosResenasProductos;
// Crear un nuevo comentario o reseña de producto
const createComentarioResenaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoComentarioResenaProducto = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuarioCliente', nuevoComentarioResenaProducto.IDUsuarioCliente)
            .input('IDProducto', nuevoComentarioResenaProducto.IDProducto)
            .input('TextoComentario', nuevoComentarioResenaProducto.TextoComentario)
            .input('Puntuacion', nuevoComentarioResenaProducto.Puntuacion)
            .input('FechaHoraComentario', nuevoComentarioResenaProducto.FechaHoraComentario)
            .query('INSERT INTO ComentariosResenasProductos (IDUsuarioCliente, IDProducto, TextoComentario, Puntuacion, FechaHoraComentario) VALUES (@IDUsuarioCliente, @IDProducto, @TextoComentario, @Puntuacion, @FechaHoraComentario)');
        res.status(201).json({ message: 'Comentario o reseña de producto creada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear comentario o reseña de producto', error });
    }
});
exports.createComentarioResenaProducto = createComentarioResenaProducto;
// Actualizar un comentario o reseña de producto
const updateComentarioResenaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedComentarioResenaProducto = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDComentario', id)
            .input('IDUsuarioCliente', updatedComentarioResenaProducto.IDUsuarioCliente)
            .input('IDProducto', updatedComentarioResenaProducto.IDProducto)
            .input('TextoComentario', updatedComentarioResenaProducto.TextoComentario)
            .input('Puntuacion', updatedComentarioResenaProducto.Puntuacion)
            .input('FechaHoraComentario', updatedComentarioResenaProducto.FechaHoraComentario)
            .query('UPDATE ComentariosResenasProductos SET IDUsuarioCliente = @IDUsuarioCliente, IDProducto = @IDProducto, TextoComentario = @TextoComentario, Puntuacion = @Puntuacion, FechaHoraComentario = @FechaHoraComentario WHERE IDComentario = @IDComentario');
        res.json({ message: 'Comentario o reseña de producto actualizada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar comentario o reseña de producto', error });
    }
});
exports.updateComentarioResenaProducto = updateComentarioResenaProducto;
// Eliminar un comentario o reseña de producto
const deleteComentarioResenaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDComentario', id)
            .query('DELETE FROM ComentariosResenasProductos WHERE IDComentario = @IDComentario');
        res.json({ message: 'Comentario o reseña de producto eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar comentario o reseña de producto', error });
    }
});
exports.deleteComentarioResenaProducto = deleteComentarioResenaProducto;
