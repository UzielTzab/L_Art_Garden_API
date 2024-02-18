import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Devolucion } from '../models/devolucionModel';

// Obtener todos los registros de Devolucion
export const getAllDevolucion = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Devolucion');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Devolucion', error });
    }
};

// Crear un nuevo registro de Devolucion
export const createDevolucion = async (req: Request, res: Response) => {
    const nuevaDevolucion: Devolucion = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Proceso', nuevaDevolucion.Proceso)
            .query('INSERT INTO Devolucion (Proceso) VALUES (@Proceso)');
        res.status(201).json({ message: 'Registro de Devolucion creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Devolucion', error });
    }
};

// Actualizar un registro de Devolucion
export const updateDevolucion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedDevolucion: Devolucion = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Proceso', updatedDevolucion.Proceso)
            .query('UPDATE Devolucion SET Proceso = @Proceso WHERE Id_Devolucion = @id');
        res.json({ message: 'Registro de Devolucion actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Devolucion', error });
    }
};

// Eliminar un registro de Devolucion
export const deleteDevolucion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Devolucion WHERE Id_Devolucion = @id');
        res.json({ message: 'Registro de Devolucion eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Devolucion', error });
    }
};
