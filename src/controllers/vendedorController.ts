import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Vendedor } from '../models/vendedorModel';

// Obtener todos los vendedores
export const getAllVendedores = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Vendedor');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener vendedores', error });
    }
};

// Obtener un vendedor por ID
export const getVendedorById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        const result = await pool.request()
            .input('id', id)
            .query('SELECT * FROM Vendedor WHERE Id_Vendedor = @id');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener vendedor', error });
    }
};

// Crear un nuevo vendedor
export const createVendedor = async (req: Request, res: Response) => {
    const newVendedor: Vendedor = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Usuario', newVendedor.Id_Usuario)
            .query('INSERT INTO Vendedor (Id_Usuario) VALUES (@Id_Usuario)');
        res.status(201).json({ message: 'Vendedor creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear vendedor', error });
    }
};

// Actualizar un vendedor
export const updateVendedor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedVendedor: Vendedor = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Id_Usuario', updatedVendedor.Id_Usuario)
            .query('UPDATE Vendedor SET Id_Usuario = @Id_Usuario WHERE Id_Vendedor = @id');
        res.json({ message: 'Vendedor actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar vendedor', error });
    }
};

// Eliminar un vendedor
export const deleteVendedor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Vendedor WHERE Id_Vendedor = @id');
        res.json({ message: 'Vendedor eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar vendedor', error });
    }
};
