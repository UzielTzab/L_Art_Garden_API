import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Inventario } from '../models/inventarioModel';

// Obtener todos los registros de Inventario
export const getAllInventario = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Inventario');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Inventario', error });
    }
};

// Crear un nuevo registro de Inventario
export const createInventario = async (req: Request, res: Response) => {
    const nuevoInventario: Inventario = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Inventario', nuevoInventario.Id_Inventario)
            .query('INSERT INTO Inventario (Id_Inventario) VALUES (@Id_Inventario)');
        res.status(201).json({ message: 'Registro de Inventario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Inventario', error });
    }
};

// Actualizar un registro de Inventario
export const updateInventario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedInventario: Inventario = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Id_Inventario', updatedInventario.Id_Inventario)
            .query('UPDATE Inventario SET Id_Inventario = @Id_Inventario WHERE Id_Inventario = @id');
        res.json({ message: 'Registro de Inventario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Inventario', error });
    }
};

// Eliminar un registro de Inventario
export const deleteInventario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Inventario WHERE Id_Inventario = @id');
        res.json({ message: 'Registro de Inventario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Inventario', error });
    }
};
