import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Pedido } from '../models/pedidoModel';

// Obtener todos los registros de Pedidos
export const getAllPedidos = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Pedidos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Pedidos', error });
    }
};

// Crear un nuevo registro de Pedidos
export const createPedido = async (req: Request, res: Response) => {
    const nuevoPedido: Pedido = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Compra', nuevoPedido.Id_Compra)
            .input('Proceso', nuevoPedido.Proceso)
            .input('Motivo_Cancelacion', nuevoPedido.Motivo_Cancelacion)
            .input('Motivo_Devolucion', nuevoPedido.Motivo_Devolucion)
            .input('Imagen', nuevoPedido.Imagen)
            .query('INSERT INTO Pedidos (Id_Compra, Proceso, Motivo_Cancelacion, Motivo_Devolucion, Imagen) VALUES (@Id_Compra, @Proceso, @Motivo_Cancelacion, @Motivo_Devolucion, @Imagen)');
        res.status(201).json({ message: 'Registro de Pedidos creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Pedidos', error });
    }
};

// Actualizar un registro de Pedidos
export const updatePedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPedido: Pedido = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Id_Compra', updatedPedido.Id_Compra)
            .input('Proceso', updatedPedido.Proceso)
            .input('Motivo_Cancelacion', updatedPedido.Motivo_Cancelacion)
            .input('Motivo_Devolucion', updatedPedido.Motivo_Devolucion)
            .input('Imagen', updatedPedido.Imagen)
            .query('UPDATE Pedidos SET Id_Compra = @Id_Compra, Proceso = @Proceso, Motivo_Cancelacion = @Motivo_Cancelacion, Motivo_Devolucion = @Motivo_Devolucion, Imagen = @Imagen WHERE Id_Pedidos = @id');
        res.json({ message: 'Registro de Pedidos actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Pedidos', error });
    }
};

// Eliminar un registro de Pedidos
export const deletePedido = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Pedidos WHERE Id_Pedidos = @id');
        res.json({ message: 'Registro de Pedidos eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Pedidos', error });
    }
};
