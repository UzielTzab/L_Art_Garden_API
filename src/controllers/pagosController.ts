import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { Pago } from '../models/pagosModel';
import sharp from 'sharp';

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
            .input('IDUsuario', nuevoPago.IDUsuario)
            .input('IDPedido', nuevoPago.IDPedido)
            .input('IDMetodo', nuevoPago.IDMetodo)
            .input('FechaHoraPago', nuevoPago.FechaHoraPago)
            .input('MontoTotalPagado', nuevoPago.MontoTotalPagado)
            .input('IDEstado', nuevoPago.IDEstado)
            .query('INSERT INTO Pagos (IDUsuario, IDPedido, IDMetodo, FechaHoraPago, MontoTotalPagado, IDEstado) VALUES (@IDUsuario, @IDPedido, @IDMetodo, @FechaHoraPago, @MontoTotalPagado, @IDEstado)');
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
            .input('IDUsuario', updatedPago.IDUsuario)
            .input('IDPedido', updatedPago.IDPedido)
            .input('IDMetodo', updatedPago.IDMetodo)
            .input('FechaHoraPago', updatedPago.FechaHoraPago)
            .input('MontoTotalPagado', updatedPago.MontoTotalPagado)
            .input('IDEstado', updatedPago.IDEstado)
            .query('UPDATE Pagos SET IDUsuario = @IDUsuario, IDPedido = @IDPedido, IDMetodo = @IDMetodo, FechaHoraPago = @FechaHoraPago, MontoTotalPagado = @MontoTotalPagado, IDEstado = @IDEstado WHERE IDPago = @IDPago');
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
