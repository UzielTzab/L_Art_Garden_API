import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Estado } from '../models/estadosModel';
import sharp from 'sharp';

// Obtener todos los estados
export const getAllEstados = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM Estados');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estados', error });
    }
};

// Crear un nuevo estado
export const createEstado = async (req: Request, res: Response) => {
    const nuevoEstado: Estado = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('Estado', nuevoEstado.Estado)
            .query('INSERT INTO Estados (Estado) VALUES (@Estado)');
        res.status(201).json({ message: 'Estado creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear estado', error });
    }
};

// Actualizar un estado
export const updateEstado = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedEstado: Estado = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDEstado', id)
            .input('Estado', updatedEstado.Estado)
            .query('UPDATE Estados SET Estado = @Estado WHERE IDEstado = @IDEstado');
        res.json({ message: 'Estado actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estado', error });
    }
};

// Eliminar un estado
export const deleteEstado = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDEstado', id)
            .query('DELETE FROM Estados WHERE IDEstado = @IDEstado');
        res.json({ message: 'Estado eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar estado', error });
    }
};
