import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { TipoUsuario } from '../models/tipoUsuarioModel';
import sharp from 'sharp';

// Obtener todos los tipos de usuario
export const getAllTipoUsuarios = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM TipoUsuario');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tipos de usuario', error });
    }
};

// Crear un nuevo tipo de usuario
export const createTipoUsuario = async (req: Request, res: Response) => {
    const nuevoTipoUsuario: TipoUsuario = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('Tipo', nuevoTipoUsuario.Tipo)
            .query('INSERT INTO TipoUsuario (Tipo) VALUES (@Tipo)');
        res.status(201).json({ message: 'Tipo de usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear tipo de usuario', error });
    }
};

// Actualizar un tipo de usuario
export const updateTipoUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTipoUsuario: TipoUsuario = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('ID', id)
            .input('Tipo', updatedTipoUsuario.Tipo)
            .query('UPDATE TipoUsuario SET Tipo = @Tipo WHERE ID = @ID');
        res.json({ message: 'Tipo de usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tipo de usuario', error });
    }
};

// Eliminar un tipo de usuario
export const deleteTipoUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('ID', id)
            .query('DELETE FROM TipoUsuario WHERE ID = @ID');
        res.json({ message: 'Tipo de usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tipo de usuario', error });
    }
};
