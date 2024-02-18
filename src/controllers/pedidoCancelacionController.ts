import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { PedidoCancelacion } from '../models/pedidoCancelacionModel';

// Obtener todos los registros de Pedidos_Cancelacion
export const getAllPedidosCancelacion = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Pedidos_Cancelacion');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Pedidos_Cancelacion', error });
    }
};

// Crear un nuevo registro de Pedidos_Cancelacion
export const createPedidoCancelacion = async (req: Request, res: Response) => {
    const nuevoPedidoCancelacion: PedidoCancelacion = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Pedidos', nuevoPedidoCancelacion.Id_Pedidos)
            .input('Id_Cancelacion', nuevoPedidoCancelacion.Id_Cancelacion)
            .query('INSERT INTO Pedidos_Cancelacion (Id_Pedidos, Id_Cancelacion) VALUES (@Id_Pedidos, @Id_Cancelacion)');
        res.status(201).json({ message: 'Registro de Pedidos_Cancelacion creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Pedidos_Cancelacion', error });
    }
};

// Eliminar un registro de Pedidos_Cancelacion
export const deletePedidoCancelacion = async (req: Request, res: Response) => {
    const { id_pedidos, id_cancelacion } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id_pedidos', id_pedidos)
            .input('id_cancelacion', id_cancelacion)
            .query('DELETE FROM Pedidos_Cancelacion WHERE Id_Pedidos = @id_pedidos AND Id_Cancelacion = @id_cancelacion');
        res.json({ message: 'Registro de Pedidos_Cancelacion eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Pedidos_Cancelacion', error });
    }
};
