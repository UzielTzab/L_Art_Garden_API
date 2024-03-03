import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { ComentarioResenaProducto } from '../models/comentariosResenasProductosModel';
import sharp from 'sharp';

// Obtener todos los comentarios y reseñas de productos
export const getAllComentariosResenasProductos = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM ComentariosResenasProductos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener comentarios y reseñas de productos', error });
    }
};

// Crear un nuevo comentario o reseña de producto
export const createComentarioResenaProducto = async (req: Request, res: Response) => {
    const nuevoComentarioResenaProducto: ComentarioResenaProducto = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuario', nuevoComentarioResenaProducto.IDUsuario)
            .input('IDProducto', nuevoComentarioResenaProducto.IDProducto)
            .input('TextoComentario', nuevoComentarioResenaProducto.TextoComentario)
            .input('Puntuacion', nuevoComentarioResenaProducto.Puntuacion)
            .input('FechaHoraComentario', nuevoComentarioResenaProducto.FechaHoraComentario)
            .query('INSERT INTO ComentariosResenasProductos (IDUsuario, IDProducto, TextoComentario, Puntuacion, FechaHoraComentario) VALUES (@IDUsuario, @IDProducto, @TextoComentario, @Puntuacion, @FechaHoraComentario)');
        res.status(201).json({ message: 'Comentario o reseña de producto creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear comentario o reseña de producto', error });
    }
};

// Actualizar un comentario o reseña de producto
export const updateComentarioResenaProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedComentarioResenaProducto: ComentarioResenaProducto = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDComentario', id)
            .input('IDUsuario', updatedComentarioResenaProducto.IDUsuario)
            .input('IDProducto', updatedComentarioResenaProducto.IDProducto)
            .input('TextoComentario', updatedComentarioResenaProducto.TextoComentario)
            .input('Puntuacion', updatedComentarioResenaProducto.Puntuacion)
            .input('FechaHoraComentario', updatedComentarioResenaProducto.FechaHoraComentario)
            .query('UPDATE ComentariosResenasProductos SET IDUsuario = @IDUsuario, IDProducto = @IDProducto, TextoComentario = @TextoComentario, Puntuacion = @Puntuacion, FechaHoraComentario = @FechaHoraComentario WHERE IDComentario = @IDComentario');
        res.json({ message: 'Comentario o reseña de producto actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar comentario o reseña de producto', error });
    }
};

// Eliminar un comentario o reseña de producto
export const deleteComentarioResenaProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDComentario', id)
            .query('DELETE FROM ComentariosResenasProductos WHERE IDComentario = @IDComentario');
        res.json({ message: 'Comentario o reseña de producto eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar comentario o reseña de producto', error });
    }
};
