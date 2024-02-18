import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Categoria } from '../models/categoriaModel';

// Obtener todas las categorias
export const getAllCategorias = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Categoria');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorias', error });
    }
};

// Obtener una categoria por su Id
export const getCategoriaById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        const result = await pool.request()
            .input('id', id)
            .query('SELECT * FROM Categoria WHERE Id_Categoria = @id');
        if (result.recordset.length === 0) {
            res.status(404).json({ message: 'Categoria no encontrada' });
        } else {
            res.json(result.recordset[0]);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categoria', error });
    }
};

// Crear una nueva categoria
export const createCategoria = async (req: Request, res: Response) => {
    const nuevaCategoria: Categoria = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Nombre', nuevaCategoria.Nombre)
            .query('INSERT INTO Categoria (Nombre) VALUES (@Nombre)');
        res.status(201).json({ message: 'Categoria creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear categoria', error });
    }
};

// Actualizar una categoria
export const updateCategoria = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCategoria: Categoria = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Nombre', updatedCategoria.Nombre)
            .query('UPDATE Categoria SET Nombre = @Nombre WHERE Id_Categoria = @id');
        res.json({ message: 'Categoria actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar categoria', error });
    }
};

// Eliminar una categoria
export const deleteCategoria = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Categoria WHERE Id_Categoria = @id');
        res.json({ message: 'Categoria eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar categoria', error });
    }
};
