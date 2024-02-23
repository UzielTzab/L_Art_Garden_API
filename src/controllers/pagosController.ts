import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Pago } from '../models/pagosModel';

// Obtener todos los pagos
export const getAllPagos = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM Pagos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pagos', error });
    }
};

// Crear un nuevo pago
export const createPago = async (req: Request, res: Response) => {
    const nuevoPago: Pago = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDPedido', nuevoPago.IDPedido)
            .input('MetodoPago', nuevoPago.MetodoPago)
            .input('FechaHoraPago', nuevoPago.FechaHoraPago)
            .input('MontoTotalPago', nuevoPago.MontoTotalPago)
            .input('EstadoPago', nuevoPago.EstadoPago)
            .query('INSERT INTO Pagos (IDPedido, MetodoPago, FechaHoraPago, MontoTotalPago, EstadoPago) VALUES (@IDPedido, @MetodoPago, @FechaHoraPago, @MontoTotalPago, @EstadoPago)');
        res.status(201).json({ message: 'Pago creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear pago', error });
    }
};

// Actualizar un pago
export const updatePago = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPago: Pago = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDPago', id)
            .input('IDPedido', updatedPago.IDPedido)
            .input('MetodoPago', updatedPago.MetodoPago)
            .input('FechaHoraPago', updatedPago.FechaHoraPago)
            .input('MontoTotalPago', updatedPago.MontoTotalPago)
            .input('EstadoPago', updatedPago.EstadoPago)
            .query('UPDATE Pagos SET IDPedido = @IDPedido, MetodoPago = @MetodoPago, FechaHoraPago = @FechaHoraPago, MontoTotalPago = @MontoTotalPago, EstadoPago = @EstadoPago WHERE IDPago = @IDPago');
        res.json({ message: 'Pago actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar pago', error });
    }
};

// Eliminar un pago
export const deletePago = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDPago', id)
            .query('DELETE FROM Pagos WHERE IDPago = @IDPago');
        res.json({ message: 'Pago eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar pago', error });
    }
};
