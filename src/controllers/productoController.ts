import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Producto } from '../models/productoModel';

// Obtener todos los productos
export const getAllProductos = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Productos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

// Obtener un producto por ID
export const getProductoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        const result = await pool.request()
            .input('id', id)
            .query('SELECT * FROM Productos WHERE id_Productos = @id');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto', error });
    }
};

// Crear un nuevo producto
export const createProducto = async (req: Request, res: Response) => {
    const nuevoProducto: Producto = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Inventario', nuevoProducto.Id_Inventario)
            .input('Imagen', nuevoProducto.Imagen)
            .input('Nombre', nuevoProducto.Nombre)
            .input('Precio', nuevoProducto.Precio)
            .input('Descripcion', nuevoProducto.Descripcion)
            .query('INSERT INTO Productos (Id_Inventario, Imagen, Nombre, Precio, Descripcion) VALUES (@Id_Inventario, @Imagen, @Nombre, @Precio, @Descripcion)');
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
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Id_Inventario', updatedProducto.Id_Inventario)
            .input('Imagen', updatedProducto.Imagen)
            .input('Nombre', updatedProducto.Nombre)
            .input('Precio', updatedProducto.Precio)
            .input('Descripcion', updatedProducto.Descripcion)
            .query('UPDATE Productos SET Id_Inventario = @Id_Inventario, Imagen = @Imagen, Nombre = @Nombre, Precio = @Precio, Descripcion = @Descripcion WHERE id_Productos = @id');
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error });
    }
};

// Eliminar un producto
export const deleteProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Productos WHERE id_Productos = @id');
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error });
    }
};
