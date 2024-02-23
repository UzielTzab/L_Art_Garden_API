import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { UsuarioCliente } from '../models/usuarioClienteModel';

// Obtener todos los usuarios cliente
export const getAllUsuariosCliente = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM UsuarioCliente');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios cliente', error });
    }
};

// Crear un nuevo usuario cliente
export const createUsuarioCliente = async (req: Request, res: Response) => {
    const nuevoUsuarioCliente: UsuarioCliente = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuario', nuevoUsuarioCliente.IDUsuario)
            .query('INSERT INTO UsuarioCliente (IDUsuario) VALUES (@IDUsuario)');
        res.status(201).json({ message: 'Usuario cliente creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario cliente', error });
    }
};

// Actualizar un usuario cliente
export const updateUsuarioCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUsuarioCliente: UsuarioCliente = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuarioCliente', id)
            .input('IDUsuario', updatedUsuarioCliente.IDUsuario)
            .query('UPDATE UsuarioCliente SET IDUsuario = @IDUsuario WHERE IDUsuarioCliente = @IDUsuarioCliente');
        res.json({ message: 'Usuario cliente actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario cliente', error });
    }
};

// Eliminar un usuario cliente
export const deleteUsuarioCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuarioCliente', id)
            .query('DELETE FROM UsuarioCliente WHERE IDUsuarioCliente = @IDUsuarioCliente');
        res.json({ message: 'Usuario cliente eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario cliente', error });
    }
};
