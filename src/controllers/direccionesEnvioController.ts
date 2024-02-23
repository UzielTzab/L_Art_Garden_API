import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { DireccionEnvio } from '../models/direccionesEnvioModel';

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
            .input('IDUsuarioCliente', nuevaDireccionEnvio.IDUsuarioCliente)
            .input('NombreCompletoDestinatario', nuevaDireccionEnvio.NombreCompletoDestinatario)
            .input('DireccionEnvio', nuevaDireccionEnvio.DireccionEnvio)
            .input('Ciudad', nuevaDireccionEnvio.Ciudad)
            .input('CodigoPostal', nuevaDireccionEnvio.CodigoPostal)
            .input('Pais', nuevaDireccionEnvio.Pais)
            .input('Telefono', nuevaDireccionEnvio.Telefono)
            .query('INSERT INTO DireccionesEnvio (IDUsuarioCliente, NombreCompletoDestinatario, DireccionEnvio, Ciudad, CodigoPostal, Pais, Telefono) VALUES (@IDUsuarioCliente, @NombreCompletoDestinatario, @DireccionEnvio, @Ciudad, @CodigoPostal, @Pais, @Telefono)');
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
            .input('IDUsuarioCliente', updatedDireccionEnvio.IDUsuarioCliente)
            .input('NombreCompletoDestinatario', updatedDireccionEnvio.NombreCompletoDestinatario)
            .input('DireccionEnvio', updatedDireccionEnvio.DireccionEnvio)
            .input('Ciudad', updatedDireccionEnvio.Ciudad)
            .input('CodigoPostal', updatedDireccionEnvio.CodigoPostal)
            .input('Pais', updatedDireccionEnvio.Pais)
            .input('Telefono', updatedDireccionEnvio.Telefono)
            .query('UPDATE DireccionesEnvio SET IDUsuarioCliente = @IDUsuarioCliente, NombreCompletoDestinatario = @NombreCompletoDestinatario, DireccionEnvio = @DireccionEnvio, Ciudad = @Ciudad, CodigoPostal = @CodigoPostal, Pais = @Pais, Telefono = @Telefono WHERE IDDireccion = @IDDireccion');
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
