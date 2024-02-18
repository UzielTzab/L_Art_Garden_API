import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Pago } from '../models/pagoModel';

// Obtener todos los registros de Pago
export const getAllPagos = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Pago');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Pago', error });
    }
};

// Crear un nuevo registro de Pago
export const createPago = async (req: Request, res: Response) => {
    const nuevoPago: Pago = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Numero_Tarjeta', nuevoPago.Numero_Tarjeta)
            .input('Fecha_Vencimiento', nuevoPago.Fecha_Vencimiento)
            .input('CSC', nuevoPago.CSC)
            .input('Nombre', nuevoPago.Nombre)
            .input('Apellidos', nuevoPago.Apellidos)
            .input('Direccion', nuevoPago.Direccion)
            .input('Colonia', nuevoPago.Colonia)
            .input('Ciudad', nuevoPago.Ciudad)
            .input('Estado', nuevoPago.Estado)
            .input('Codigo_Postal', nuevoPago.Codigo_Postal)
            .input('Celular', nuevoPago.Celular)
            .input('Correo_Electronico', nuevoPago.Correo_Electronico)
            .query('INSERT INTO Pago (Numero_Tarjeta, Fecha_Vencimiento, CSC, Nombre, Apellidos, Direccion, Colonia, Ciudad, Estado, Codigo_Postal, Celular, Correo_Electronico) VALUES (@Numero_Tarjeta, @Fecha_Vencimiento, @CSC, @Nombre, @Apellidos, @Direccion, @Colonia, @Ciudad, @Estado, @Codigo_Postal, @Celular, @Correo_Electronico)');
        res.status(201).json({ message: 'Registro de Pago creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Pago', error });
    }
};

// Actualizar un registro de Pago
export const updatePago = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPago: Pago = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Numero_Tarjeta', updatedPago.Numero_Tarjeta)
            .input('Fecha_Vencimiento', updatedPago.Fecha_Vencimiento)
            .input('CSC', updatedPago.CSC)
            .input('Nombre', updatedPago.Nombre)
            .input('Apellidos', updatedPago.Apellidos)
            .input('Direccion', updatedPago.Direccion)
            .input('Colonia', updatedPago.Colonia)
            .input('Ciudad', updatedPago.Ciudad)
            .input('Estado', updatedPago.Estado)
            .input('Codigo_Postal', updatedPago.Codigo_Postal)
            .input('Celular', updatedPago.Celular)
            .input('Correo_Electronico', updatedPago.Correo_Electronico)
            .query('UPDATE Pago SET Numero_Tarjeta = @Numero_Tarjeta, Fecha_Vencimiento = @Fecha_Vencimiento, CSC = @CSC, Nombre = @Nombre, Apellidos = @Apellidos, Direccion = @Direccion, Colonia = @Colonia, Ciudad = @Ciudad, Estado = @Estado, Codigo_Postal = @Codigo_Postal, Celular = @Celular, Correo_Electronico = @Correo_Electronico WHERE Id_Pago = @id');
        res.json({ message: 'Registro de Pago actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Pago', error });
    }
};

// Eliminar un registro de Pago
export const deletePago = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Pago WHERE Id_Pago = @id');
        res.json({ message: 'Registro de Pago eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Pago', error });
    }
};
