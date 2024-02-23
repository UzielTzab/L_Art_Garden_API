import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { UsuarioVendedor } from '../models/usuarioVendedorModel';

// Obtener todos los usuarios vendedor
export const getAllUsuariosVendedor = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolExport.request().query('SELECT * FROM UsuarioVendedor');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios vendedor', error });
    }
};

// Crear un nuevo usuario vendedor
export const createUsuarioVendedor = async (req: Request, res: Response) => {
    const nuevoUsuarioVendedor: UsuarioVendedor = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuario', nuevoUsuarioVendedor.IDUsuario)
            .query('INSERT INTO UsuarioVendedor (IDUsuario) VALUES (@IDUsuario)');
        res.status(201).json({ message: 'Usuario vendedor creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario vendedor', error });
    }
};

// Actualizar un usuario vendedor
export const updateUsuarioVendedor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUsuarioVendedor: UsuarioVendedor = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuarioVendedor', id)
            .input('IDUsuario', updatedUsuarioVendedor.IDUsuario)
            .query('UPDATE UsuarioVendedor SET IDUsuario = @IDUsuario WHERE IDUsuarioVendedor = @IDUsuarioVendedor');
        res.json({ message: 'Usuario vendedor actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario vendedor', error });
    }
};

// Eliminar un usuario vendedor
export const deleteUsuarioVendedor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuarioVendedor', id)
            .query('DELETE FROM UsuarioVendedor WHERE IDUsuarioVendedor = @IDUsuarioVendedor');
        res.json({ message: 'Usuario vendedor eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario vendedor', error });
    }
};
