import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Devolucion } from '../models/devolucionesModel';

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
            .input('EstadoDevolucion', nuevaDevolucion.EstadoDevolucion)
            .query('INSERT INTO Devoluciones (IDPedidoDevolucion, FechaHoraDevolucion, MotivoDevolucion, EstadoDevolucion) VALUES (@IDPedidoDevolucion, @FechaHoraDevolucion, @MotivoDevolucion, @EstadoDevolucion)');
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
            .input('EstadoDevolucion', updatedDevolucion.EstadoDevolucion)
            .query('UPDATE Devoluciones SET IDPedidoDevolucion = @IDPedidoDevolucion, FechaHoraDevolucion = @FechaHoraDevolucion, MotivoDevolucion = @MotivoDevolucion, EstadoDevolucion = @EstadoDevolucion WHERE IDDevolucion = @IDDevolucion');
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
