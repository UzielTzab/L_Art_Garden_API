import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Cancelacion } from '../models/cancelacionesModel';
import sharp from 'sharp';


// Obtener todas las cancelaciones
export const getAllCancelaciones = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM Cancelaciones');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cancelaciones', error });
    }
};

// Crear una nueva cancelación
export const createCancelacion = async (req: Request, res: Response) => {
    const nuevaCancelacion: Cancelacion = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
        .input('IDPedidoCancelado', nuevaCancelacion.IDPedidoCancelado)
        .input('FechaHoraCancelacion', nuevaCancelacion.FechaHoraCancelacion)
        .input('MotivoCancelacion', nuevaCancelacion.MotivoCancelacion)
        .input('IDEstado', nuevaCancelacion.IDEstado)
        .query('INSERT INTO Cancelaciones (IDPedidoCancelado, FechaHoraCancelacion, MotivoCancelacion, IDEstado) VALUES (@IDPedidoCancelado, @FechaHoraCancelacion, @MotivoCancelacion, @IDEstado)');
        res.status(201).json({ message: 'Cancelación creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cancelación', error });
    }
};

// Actualizar una cancelación
export const updateCancelacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCancelacion: Cancelacion = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
        .input('IDCancelacion', id)
        .input('IDPedidoCancelado', updatedCancelacion.IDPedidoCancelado)
        .input('FechaHoraCancelacion', updatedCancelacion.FechaHoraCancelacion)
        .input('MotivoCancelacion', updatedCancelacion.MotivoCancelacion)
        .input('IDEstado', updatedCancelacion.IDEstado)
        .query('UPDATE Cancelaciones SET IDPedidoCancelado = @IDPedidoCancelado, FechaHoraCancelacion = @FechaHoraCancelacion, MotivoCancelacion = @MotivoCancelacion, IDEstado = @IDEstado WHERE IDCancelacion = @IDCancelacion');
        res.json({ message: 'Cancelación actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cancelación', error });
    }
};

// Eliminar una cancelación
export const deleteCancelacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDCancelacion', id)
            .query('DELETE FROM Cancelaciones WHERE IDCancelacion = @IDCancelacion');
        res.json({ message: 'Cancelación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cancelación', error });
    }
};
