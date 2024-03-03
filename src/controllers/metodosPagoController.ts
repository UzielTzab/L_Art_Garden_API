import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { MetodoPago } from '../models/metodosPagoModel';
import sharp from 'sharp';

// Obtener todos los métodos de pago
export const getAllMetodosPago = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM MetodosPago');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener métodos de pago', error });
    }
};

// Crear un nuevo método de pago
export const createMetodoPago = async (req: Request, res: Response) => {
    const nuevoMetodoPago: MetodoPago = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDUsuario', nuevoMetodoPago.IDUsuario)
            .input('NumeroTarjeta', nuevoMetodoPago.NumeroTarjeta)
            .input('Nombre', nuevoMetodoPago.Nombre)
            .input('Apellido', nuevoMetodoPago.Apellido)
            .input('Expiracion', nuevoMetodoPago.Expiracion)
            .input('CodigoSeguridad', nuevoMetodoPago.CodigoSeguridad)
            .query('INSERT INTO MetodosPago (IDUsuario, NumeroTarjeta, Nombre, Apellido, Expiracion, CodigoSeguridad) VALUES (@IDUsuario, @NumeroTarjeta, @Nombre, @Apellido, @Expiracion, @CodigoSeguridad)');
        res.status(201).json({ message: 'Método de pago creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear método de pago', error });
    }
};

// Actualizar un método de pago
export const updateMetodoPago = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedMetodoPago: MetodoPago = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDMetodo', id)
            .input('IDUsuario', updatedMetodoPago.IDUsuario)
            .input('NumeroTarjeta', updatedMetodoPago.NumeroTarjeta)
            .input('Nombre', updatedMetodoPago.Nombre)
            .input('Apellido', updatedMetodoPago.Apellido)
            .input('Expiracion', updatedMetodoPago.Expiracion)
            .input('CodigoSeguridad', updatedMetodoPago.CodigoSeguridad)
            .query('UPDATE MetodosPago SET IDUsuario = @IDUsuario, NumeroTarjeta = @NumeroTarjeta, Nombre = @Nombre, Apellido = @Apellido, Expiracion = @Expiracion, CodigoSeguridad = @CodigoSeguridad WHERE IDMetodo = @IDMetodo');
        res.json({ message: 'Método de pago actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar método de pago', error });
    }
};

// Eliminar un método de pago
export const deleteMetodoPago = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDMetodo', id)
            .query('DELETE FROM MetodosPago WHERE IDMetodo = @IDMetodo');
        res.json({ message: 'Método de pago eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar método de pago', error });
    }
};
