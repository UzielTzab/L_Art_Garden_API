import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Devolucion } from '../models/devolucionesModel';
import sharp from 'sharp';

// Obtener todas las devoluciones
export const getAllDevoluciones = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM Devoluciones');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener devoluciones', error });
    }
};

// Crear una nueva devolución
export const createDevolucion = async (req: Request, res: Response) => {
    const nuevaDevolucion: Devolucion = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDPedidoDevolucion', nuevaDevolucion.IDPedidoDevolucion)
            .input('FechaHoraDevolucion', nuevaDevolucion.FechaHoraDevolucion)
            .input('MotivoDevolucion', nuevaDevolucion.MotivoDevolucion)
            .input('IDEstado', nuevaDevolucion.IDEstado)
            .query('INSERT INTO Devoluciones (IDPedidoDevolucion, FechaHoraDevolucion, MotivoDevolucion, IDEstado) VALUES (@IDPedidoDevolucion, @FechaHoraDevolucion, @MotivoDevolucion, @IDEstado)');
        res.status(201).json({ message: 'Devolución creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear devolución', error });
    }
};

// Actualizar una devolución
export const updateDevolucion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedDevolucion: Devolucion = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDDevolucion', id)
            .input('IDPedidoDevolucion', updatedDevolucion.IDPedidoDevolucion)
            .input('FechaHoraDevolucion', updatedDevolucion.FechaHoraDevolucion)
            .input('MotivoDevolucion', updatedDevolucion.MotivoDevolucion)
            .input('IDEstado', updatedDevolucion.IDEstado)
            .query('UPDATE Devoluciones SET IDPedidoDevolucion = @IDPedidoDevolucion, FechaHoraDevolucion = @FechaHoraDevolucion, MotivoDevolucion = @MotivoDevolucion, IDEstado = @IDEstado WHERE IDDevolucion = @IDDevolucion');
        res.json({ message: 'Devolución actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar devolución', error });
    }
};

// Eliminar una devolución
export const deleteDevolucion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDDevolucion', id)
            .query('DELETE FROM Devoluciones WHERE IDDevolucion = @IDDevolucion');
        res.json({ message: 'Devolución eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar devolución', error });
    }
};
