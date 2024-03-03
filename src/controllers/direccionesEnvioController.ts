import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { DireccionEnvio } from '../models/direccionesEnvioModel';
import sharp from 'sharp';

// Obtener todas las direcciones de envío
export const getAllDireccionesEnvio = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM DireccionesEnvio');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener direcciones de envío', error });
    }
};

// Crear una nueva dirección de envío
export const createDireccionEnvio = async (req: Request, res: Response) => {
    const nuevaDireccionEnvio: DireccionEnvio = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuario', nuevaDireccionEnvio.IDUsuario)
            .input('NombreCompletoDestinatario', nuevaDireccionEnvio.NombreCompletoDestinatario)
            .input('DireccionEnvio', nuevaDireccionEnvio.DireccionEnvio)
            .input('Ciudad', nuevaDireccionEnvio.Ciudad)
            .input('CodigoPostal', nuevaDireccionEnvio.CodigoPostal)
            .input('Pais', nuevaDireccionEnvio.Pais)
            .input('TelefonoContacto', nuevaDireccionEnvio.TelefonoContacto)
            .query('INSERT INTO DireccionesEnvio (IDUsuario, NombreCompletoDestinatario, DireccionEnvio, Ciudad, CodigoPostal, Pais, TelefonoContacto) VALUES (@IDUsuario, @NombreCompletoDestinatario, @DireccionEnvio, @Ciudad, @CodigoPostal, @Pais, @TelefonoContacto)');
        res.status(201).json({ message: 'Dirección de envío creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear dirección de envío', error });
    }
    };

// Actualizar una dirección de envío
export const updateDireccionEnvio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedDireccionEnvio: DireccionEnvio = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDDireccion', id)
            .input('IDUsuario', updatedDireccionEnvio.IDUsuario)
            .input('NombreCompletoDestinatario', updatedDireccionEnvio.NombreCompletoDestinatario)
            .input('DireccionEnvio', updatedDireccionEnvio.DireccionEnvio)
            .input('Ciudad', updatedDireccionEnvio.Ciudad)
            .input('CodigoPostal', updatedDireccionEnvio.CodigoPostal)
            .input('Pais', updatedDireccionEnvio.Pais)
            .input('TelefonoContacto', updatedDireccionEnvio.TelefonoContacto)
            .query('UPDATE DireccionesEnvio SET IDUsuario = @IDUsuario, NombreCompletoDestinatario = @NombreCompletoDestinatario, DireccionEnvio = @DireccionEnvio, Ciudad = @Ciudad, CodigoPostal = @CodigoPostal, Pais = @Pais, TelefonoContacto = @TelefonoContacto WHERE IDDireccion = @IDDireccion');
        res.json({ message: 'Dirección de envío actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar dirección de envío', error });
    }
    };


// Eliminar una dirección de envío
export const deleteDireccionEnvio = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDDireccion', id)
            .query('DELETE FROM DireccionesEnvio WHERE IDDireccion = @IDDireccion');
        res.json({ message: 'Dirección de envío eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar dirección de envío', error });
    }
};
