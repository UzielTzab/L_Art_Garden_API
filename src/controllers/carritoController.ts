import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Carrito } from '../models/carritoModel';

// Obtener todos los registros de Carrito
export const getAllCarrito = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Carrito');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Carrito', error });
    }
};

// Crear un nuevo registro de Carrito
export const createCarrito = async (req: Request, res: Response) => {
    const nuevoCarrito: Carrito = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Nombre', nuevoCarrito.Nombre)
            .query('INSERT INTO Carrito (Nombre) VALUES (@Nombre)');
        res.status(201).json({ message: 'Registro de Carrito creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Carrito', error });
    }
};

// Actualizar un registro de Carrito
export const updateCarrito = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCarrito: Carrito = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Nombre', updatedCarrito.Nombre)
            .query('UPDATE Carrito SET Nombre = @Nombre WHERE Id_Carrito = @id');
        res.json({ message: 'Registro de Carrito actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Carrito', error });
    }
};

// Eliminar un registro de Carrito
export const deleteCarrito = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Carrito WHERE Id_Carrito = @id');
        res.json({ message: 'Registro de Carrito eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Carrito', error });
    }
};
