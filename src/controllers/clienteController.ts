import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Cliente } from '../models/clienteModel';

// Obtener todos los registros de Cliente
export const getAllCliente = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Cliente');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Cliente', error });
    }
};

// Crear un nuevo registro de Cliente
export const createCliente = async (req: Request, res: Response) => {
    const nuevoCliente: Cliente = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Usuario', nuevoCliente.Id_Usuario)
            .query('INSERT INTO Cliente (Id_Usuario) VALUES (@Id_Usuario)');
        res.status(201).json({ message: 'Registro de Cliente creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Cliente', error });
    }
};

// Actualizar un registro de Cliente
export const updateCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCliente: Cliente = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Id_Usuario', updatedCliente.Id_Usuario)
            .query('UPDATE Cliente SET Id_Usuario = @Id_Usuario WHERE Id_Cliente = @id');
        res.json({ message: 'Registro de Cliente actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Cliente', error });
    }
};

// Eliminar un registro de Cliente
export const deleteCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Cliente WHERE Id_Cliente = @id');
        res.json({ message: 'Registro de Cliente eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Cliente', error });
    }
};
