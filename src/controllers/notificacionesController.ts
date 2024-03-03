import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Notificacion } from '../models/notificacionesModel';
import sharp from 'sharp';

// Obtener todas las notificaciones
export const getAllNotificaciones = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM Notificaciones');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener notificaciones', error });
    }
};

// Crear una nueva notificación
export const createNotificacion = async (req: Request, res: Response) => {
    const nuevaNotificacion: Notificacion = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuario', nuevaNotificacion.IDUsuario)
            .input('TipoNotificacion', nuevaNotificacion.TipoNotificacion)
            .input('MensajeNotificacion', nuevaNotificacion.MensajeNotificacion)
            .input('FechaHoraNotificacion', nuevaNotificacion.FechaHoraNotificacion)
            .input('EstadoNotificacion', nuevaNotificacion.EstadoNotificacion)
            .query('INSERT INTO Notificaciones (IDUsuario, TipoNotificacion, MensajeNotificacion, FechaHoraNotificacion, EstadoNotificacion) VALUES (@IDUsuario, @TipoNotificacion, @MensajeNotificacion, @FechaHoraNotificacion, @EstadoNotificacion)');
        res.status(201).json({ message: 'Notificación creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear notificación', error });
    }
};

// Actualizar una notificación
export const updateNotificacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedNotificacion: Notificacion = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDNotificacion', id)
            .input('IDUsuario', updatedNotificacion.IDUsuario)
            .input('TipoNotificacion', updatedNotificacion.TipoNotificacion)
            .input('MensajeNotificacion', updatedNotificacion.MensajeNotificacion)
            .input('FechaHoraNotificacion', updatedNotificacion.FechaHoraNotificacion)
            .input('EstadoNotificacion', updatedNotificacion.EstadoNotificacion)
            .query('UPDATE Notificaciones SET IDUsuario = @IDUsuario, TipoNotificacion = @TipoNotificacion, MensajeNotificacion = @MensajeNotificacion, FechaHoraNotificacion = @FechaHoraNotificacion, EstadoNotificacion = @EstadoNotificacion WHERE IDNotificacion = @IDNotificacion');
        res.json({ message: 'Notificación actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar notificación', error });
    }
};

// Eliminar una notificación
export const deleteNotificacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDNotificacion', id)
            .query('DELETE FROM Notificaciones WHERE IDNotificacion = @IDNotificacion');
        res.json({ message: 'Notificación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar notificación', error });
    }
};
