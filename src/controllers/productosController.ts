import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Producto } from '../models/productosModel';
import sharp from 'sharp';

// Obtener todos los productos
export const getAllProductos = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM Productos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

// Crear un nuevo producto
export const createProducto = async (req: Request, res: Response) => {
    const nuevoProducto: Producto = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDCategoria', nuevoProducto.IDCategoria)
            .input('IDInventario', nuevoProducto.IDInventario)
            .input('NombreProducto', nuevoProducto.NombreProducto)
            .input('Descripcion', nuevoProducto.Descripcion)
            .input('Precio', nuevoProducto.Precio)
            .input('Stock', nuevoProducto.Stock)
            .query('INSERT INTO Productos (IDCategoria, IDInventario, NombreProducto, Descripcion, Precio, Stock) VALUES (@IDCategoria, @IDInventario, @NombreProducto, @Descripcion, @Precio, @Stock)');
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error });
    }
};

// Actualizar un producto
export const updateProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedProducto: Producto = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDProducto', id)
            .input('IDCategoria', updatedProducto.IDCategoria)
            .input('IDInventario', updatedProducto.IDInventario)
            .input('NombreProducto', updatedProducto.NombreProducto)
            .input('Descripcion', updatedProducto.Descripcion)
            .input('Precio', updatedProducto.Precio)
            .input('Stock', updatedProducto.Stock)
            .query('UPDATE Productos SET IDCategoria = @IDCategoria, IDInventario = @IDInventario, NombreProducto = @NombreProducto, Descripcion = @Descripcion, Precio = @Precio, Stock = @Stock WHERE IDProducto = @IDProducto');
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error });
    }
};

// Eliminar un producto
export const deleteProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDProducto', id)
            .query('DELETE FROM Productos WHERE IDProducto = @IDProducto');
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error });
    }
};
