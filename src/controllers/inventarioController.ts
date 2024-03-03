import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Inventario } from '../models/inventarioModel';
import sharp from 'sharp';

// Obtener todo el inventario
export const getAllInventario = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM Inventario');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener inventario', error });
    }
};

// Crear un nuevo registro de inventario
export const createInventario = async (req: Request, res: Response) => {
    const nuevoInventario: Inventario = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDFloreria', nuevoInventario.IDFloreria)
            .query('INSERT INTO Inventario (IDFloreria) VALUES (@IDFloreria)');
        res.status(201).json({ message: 'Registro de inventario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de inventario', error });
    }
};

// Actualizar un registro de inventario
export const updateInventario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedInventario: Inventario = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDInventario', id)
            .input('IDFloreria', updatedInventario.IDFloreria)
            .query('UPDATE Inventario SET IDFloreria = @IDFloreria WHERE IDInventario = @IDInventario');
        res.json({ message: 'Registro de inventario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de inventario', error });
    }
    };

// Eliminar un registro de inventario
export const deleteInventario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDInventario', id)
            .query('DELETE FROM Inventario WHERE IDInventario = @IDInventario');
        res.json({ message: 'Registro de inventario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de inventario', error });
    }
    };
