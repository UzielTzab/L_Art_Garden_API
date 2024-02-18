import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Cancelacion } from '../models/cancelacionModel';

// Obtener todos los registros de Cancelacion
export const getAllCancelacion = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Cancelacion');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Cancelacion', error });
    }
};

// Crear un nuevo registro de Cancelacion
export const createCancelacion = async (req: Request, res: Response) => {
    const nuevaCancelacion: Cancelacion = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Proceso', nuevaCancelacion.Proceso)
            .query('INSERT INTO Cancelacion (Proceso) VALUES (@Proceso)');
        res.status(201).json({ message: 'Registro de Cancelacion creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Cancelacion', error });
    }
};

// Actualizar un registro de Cancelacion
export const updateCancelacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCancelacion: Cancelacion = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Proceso', updatedCancelacion.Proceso)
            .query('UPDATE Cancelacion SET Proceso = @Proceso WHERE Id_Cancelacion = @id');
        res.json({ message: 'Registro de Cancelacion actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Cancelacion', error });
    }
};

// Eliminar un registro de Cancelacion
export const deleteCancelacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Cancelacion WHERE Id_Cancelacion = @id');
        res.json({ message: 'Registro de Cancelacion eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Cancelacion', error });
    }
};
