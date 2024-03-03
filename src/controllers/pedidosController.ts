import { Request, Response } from 'express';
import {poolExport} from '../config/dbConfig';
import { Pedido } from '../models/pedidosModel';
import sharp from 'sharp';

// Obtener todos los pedidos
export const getAllPedidos = async (req: Request, res: Response) => {
    try {
        const pool = await poolExport.connect();
        const result = await pool.request().query('SELECT * FROM Pedidos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedidos', error });
    }
};

// Crear un nuevo pedido
export const createPedido = async (req: Request, res: Response) => {
    const nuevoPedido: Pedido = req.body;
    try {
            const pool = await poolExport.connect();
            await pool.request()
            .input('IDUsuario', nuevoPedido.IDUsuario)
            .input('FechaHoraPedido', nuevoPedido.FechaHoraPedido)
            .input('IDEstado', nuevoPedido.IDEstado)
            .query('INSERT INTO Pedidos (IDUsuario, FechaHoraPedido, IDEstado) VALUES (@IDUsuario, @FechaHoraPedido, @IDEstado)');
        res.status(201).json({ message: 'Pedido creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear pedido', error });
    }
    };

// Actualizar un pedido
export const updatePedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPedido: Pedido = req.body;
    try {
        const pool = await poolExport.connect();
        await pool.request()
            .input('IDPedido', id)
            .input('IDUsuario', updatedPedido.IDUsuario)
            .input('FechaHoraPedido', updatedPedido.FechaHoraPedido)
            .input('IDEstado', updatedPedido.IDEstado)
            .query('UPDATE Pedidos SET IDUsuario = @IDUsuario, FechaHoraPedido = @FechaHoraPedido, IDEstado = @IDEstado WHERE IDPedido = @IDPedido');
        res.json({ message: 'Pedido actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar pedido', error });
    }
    };

// Eliminar un pedido
export const deletePedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pool = await poolExport.connect();
        await pool.request()
            .input('IDPedido', id)
            .query('DELETE FROM Pedidos WHERE IDPedido = @IDPedido');
        res.json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar pedido', error });
    }
};
