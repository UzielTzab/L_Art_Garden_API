import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Floreria } from '../models/floreriasModel';
import sharp from 'sharp';

// Obtener todas las florerías
export const getAllFlorerias = async (req: Request, res: Response) => {
    try {
        const poolExportito = await poolExport.connect();
        const result = await poolExportito.request().query('SELECT * FROM Florerias');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener florerías', error });
    }
};

// Crear una nueva florería
export const createFloreria = async (req: Request, res: Response) => {
    const nuevaFloreria: Floreria = req.body;
    try {
        const poolExportito = await poolExport.connect();
        const result = await poolExportito.request()
            .input('IDUsuario', nuevaFloreria.IDUsuario)
            .input('IDInventario', nuevaFloreria.IDInventario)
            .input('NombreFloreria', nuevaFloreria.NombreFloreria)
            .input('Descripcion', nuevaFloreria.Descripcion)
            .input('Direccion', nuevaFloreria.Direccion)
            .input('Telefono', nuevaFloreria.Telefono)
            .input('CorreoElectronico', nuevaFloreria.CorreoElectronico)
            .input('RedesSociales', nuevaFloreria.RedesSociales)
            .input('Foto', nuevaFloreria.Foto)
            .query('INSERT INTO Florerias (IDUsuario, IDInventario, NombreFloreria, Descripcion, Direccion, Telefono, CorreoElectronico, RedesSociales, Foto) VALUES (@IDUsuario, @IDInventario, @NombreFloreria, @Descripcion, @Direccion, @Telefono, @CorreoElectronico, @RedesSociales, @Foto)');
        res.status(201).json({ message: 'Florería creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear florería', error });
    }
    };

// Actualizar una florería
export const updateFloreria = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFloreria: Floreria = req.body;
    try {
        const poolExportito = await poolExport.connect();
        const result = await poolExportito.request()
            .input('ID', id)
            .input('IDUsuario', updatedFloreria.IDUsuario)
            .input('IDInventario', updatedFloreria.IDInventario)
            .input('NombreFloreria', updatedFloreria.NombreFloreria)
            .input('Descripcion', updatedFloreria.Descripcion)
            .input('Direccion', updatedFloreria.Direccion)
            .input('Telefono', updatedFloreria.Telefono)
            .input('CorreoElectronico', updatedFloreria.CorreoElectronico)
            .input('RedesSociales', updatedFloreria.RedesSociales)
            .input('Foto', updatedFloreria.Foto)
            .query('UPDATE Florerias SET IDUsuario = @IDUsuario, IDInventario = @IDInventario, NombreFloreria = @NombreFloreria, Descripcion = @Descripcion, Direccion = @Direccion, Telefono = @Telefono, CorreoElectronico = @CorreoElectronico, RedesSociales = @RedesSociales, Foto = @Foto WHERE ID = @ID');
        res.json({ message: 'Florería actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar florería', error });
    }
    };

// Eliminar una florería
export const deleteFloreria = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolExportito = await poolExport.connect();
        const result = await poolExportito.request()
            .input('ID', id)
            .query('DELETE FROM Florerias WHERE ID = @ID');
        res.json({ message: 'Florería eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar florería', error });
    }
};
