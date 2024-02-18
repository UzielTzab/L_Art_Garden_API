import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { ProductosCategoria } from '../models/productosCategoriaModel';

// Obtener todos los registros de productos_categoria
export const getAllProductosCategoria = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Productos_Categoria');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de productos_categoria', error });
    }
};

// Crear un nuevo registro de productos_categoria
export const createProductosCategoria = async (req: Request, res: Response) => {
    const nuevoRegistro: ProductosCategoria = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Productos', nuevoRegistro.Id_Productos)
            .input('Id_Categoria', nuevoRegistro.Id_Categoria)
            .query('INSERT INTO Productos_Categoria (Id_Productos, Id_Categoria) VALUES (@Id_Productos, @Id_Categoria)');
        res.status(201).json({ message: 'Registro de productos_categoria creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de productos_categoria', error });
    }
};

// Eliminar un registro de productos_categoria
export const deleteProductosCategoria = async (req: Request, res: Response) => {
    const { id_productos, id_categoria } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id_productos', id_productos)
            .input('id_categoria', id_categoria)
            .query('DELETE FROM Productos_Categoria WHERE Id_Productos = @id_productos AND Id_Categoria = @id_categoria');
        res.json({ message: 'Registro de productos_categoria eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de productos_categoria', error });
    }
};
