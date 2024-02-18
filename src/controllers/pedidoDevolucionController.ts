import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { PedidoDevolucion } from '../models/pedidoDevolucionModel';

// Obtener todos los registros de Pedidos_Devolucion
export const getAllPedidosDevolucion = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Pedidos_Devolucion');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Pedidos_Devolucion', error });
    }
};

// Crear un nuevo registro de Pedidos_Devolucion
export const createPedidoDevolucion = async (req: Request, res: Response) => {
    const nuevoPedidoDevolucion: PedidoDevolucion = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Pedidos', nuevoPedidoDevolucion.Id_Pedidos)
            .input('Id_Devolucion', nuevoPedidoDevolucion.Id_Devolucion)
            .query('INSERT INTO Pedidos_Devolucion (Id_Pedidos, Id_Devolucion) VALUES (@Id_Pedidos, @Id_Devolucion)');
        res.status(201).json({ message: 'Registro de Pedidos_Devolucion creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Pedidos_Devolucion', error });
    }
};

// Eliminar un registro de Pedidos_Devolucion
export const deletePedidoDevolucion = async (req: Request, res: Response) => {
    const { id_pedidos, id_devolucion } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id_pedidos', id_pedidos)
            .input('id_devolucion', id_devolucion)
            .query('DELETE FROM Pedidos_Devolucion WHERE Id_Pedidos = @id_pedidos AND Id_Devolucion = @id_devolucion');
        res.json({ message: 'Registro de Pedidos_Devolucion eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Pedidos_Devolucion', error });
    }
};
