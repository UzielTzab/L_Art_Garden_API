import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { FotoProducto } from '../models/fotosProductosModel';
import sharp from 'sharp';

// Obtener todas las fotos de un producto
export const getFotosProducto = async (req: Request, res: Response) => {
    const { idProducto } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDProducto', idProducto)
            .query('SELECT * FROM FotosProductos WHERE IDProducto = @IDProducto');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener fotos de producto', error });
    }
};

// Crear una nueva foto para un producto
export const createFotoProducto = async (req: Request, res: Response) => {
    const nuevaFoto: FotoProducto = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDProducto', nuevaFoto.IDProducto)
            .input('Foto', nuevaFoto.Foto)
            .query('INSERT INTO FotosProductos (IDProducto, Foto) VALUES (@IDProducto, @Foto)');
        res.status(201).json({ message: 'Foto de producto creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear foto de producto', error });
    }
};

// Eliminar una foto de un producto
export const deleteFotoProducto = async (req: Request, res: Response) => {
    const { idFoto } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDFoto', idFoto)
            .query('DELETE FROM FotosProductos WHERE IDFoto = @IDFoto');
        res.json({ message: 'Foto de producto eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar foto de producto', error });
    }
};
