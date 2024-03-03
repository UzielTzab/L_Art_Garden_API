import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { CategoriaProducto } from '../models/categoriasProductosModel';
import sharp from 'sharp';

// Obtener todas las categorías de productos
export const getAllCategoriasProductos = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM CategoriasProductos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías de productos', error });
    }
};

// Crear una nueva categoría de producto
export const createCategoriaProducto = async (req: Request, res: Response) => {
    const nuevaCategoriaProducto: CategoriaProducto = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('NombreCategoria', nuevaCategoriaProducto.NombreCategoria)
            .input('Descripcion', nuevaCategoriaProducto.Descripcion)
            .query('INSERT INTO CategoriasProductos (NombreCategoria, Descripcion) VALUES (@NombreCategoria, @Descripcion)');
        res.status(201).json({ message: 'Categoría de producto creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear categoría de producto', error });
    }
};

// Actualizar una categoría de producto
export const updateCategoriaProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCategoriaProducto: CategoriaProducto = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('ID', id)
            .input('NombreCategoria', updatedCategoriaProducto.NombreCategoria)
            .input('Descripcion', updatedCategoriaProducto.Descripcion)
            .query('UPDATE CategoriasProductos SET NombreCategoria = @NombreCategoria, Descripcion = @Descripcion WHERE ID = @ID');
        res.json({ message: 'Categoría de producto actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar categoría de producto', error });
    }
};

// Eliminar una categoría de producto
export const deleteCategoriaProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('ID', id)
            .query('DELETE FROM CategoriasProductos WHERE ID = @ID');
        res.json({ message: 'Categoría de producto eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar categoría de producto', error });
    }
};