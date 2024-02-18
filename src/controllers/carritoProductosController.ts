import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { CarritoProducto } from '../models/carritoProductosModel';

// Obtener todos los registros de Carrito_Productos
export const getAllCarritoProductos = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Carrito_Productos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Carrito_Productos', error });
    }
};

// Crear un nuevo registro de Carrito_Productos
export const createCarritoProducto = async (req: Request, res: Response) => {
    const nuevoCarritoProducto: CarritoProducto = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Carrito', nuevoCarritoProducto.Id_Carrito)
            .input('Id_Producto', nuevoCarritoProducto.Id_Producto)
            .query('INSERT INTO Carrito_Productos (Id_Carrito, Id_Producto) VALUES (@Id_Carrito, @Id_Producto)');
        res.status(201).json({ message: 'Registro de Carrito_Productos creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Carrito_Productos', error });
    }
};

// Eliminar un registro de Carrito_Productos
export const deleteCarritoProducto = async (req: Request, res: Response) => {
    const { idCarrito, idProducto } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('idCarrito', idCarrito)
            .input('idProducto', idProducto)
            .query('DELETE FROM Carrito_Productos WHERE Id_Carrito = @idCarrito AND Id_Producto = @idProducto');
        res.json({ message: 'Registro de Carrito_Productos eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Carrito_Productos', error });
    }
};
