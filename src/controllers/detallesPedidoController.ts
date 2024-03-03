import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { DetallePedido } from '../models/detallesPedidoModel';
import sharp from 'sharp';

// Obtener todos los detalles de pedido
export const getAllDetallesPedido  = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM DetallesPedido');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener detalles de pedido', error });
    }
};

// Crear un nuevo detalle de pedido
export const createDetallePedido  = async (req: Request, res: Response) => {
    const nuevoDetallePedido: DetallePedido = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
        .input('IDPedido', nuevoDetallePedido.IDPedido)
        .input('IDProducto', nuevoDetallePedido.IDProducto)
        .input('Cantidad', nuevoDetallePedido.Cantidad)
        .input('PrecioUnitario', nuevoDetallePedido.PrecioUnitario)
        .input('Subtotal', nuevoDetallePedido.Subtotal)
        .query('INSERT INTO DetallesPedido (IDPedido, IDProducto, Cantidad, PrecioUnitario, Subtotal) VALUES (@IDPedido, @IDProducto, @Cantidad, @PrecioUnitario, @Subtotal)');
        res.status(201).json({ message: 'Detalle de pedido creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear detalle de pedido', error });
    }
};

// Actualizar un detalle de pedido
export const updateDetallePedido  = async (req: Request, res: Response) => {
    const { id } = req.params;
    const nuevoDetallePedido: DetallePedido = req.body;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
        .input('IDPedido', nuevoDetallePedido.IDPedido)
        .input('IDProducto', nuevoDetallePedido.IDProducto)
        .input('Cantidad', nuevoDetallePedido.Cantidad)
        .input('PrecioUnitario', nuevoDetallePedido.PrecioUnitario)
        .input('Subtotal', nuevoDetallePedido.Subtotal)
        .query('INSERT INTO DetallesPedido (IDPedido, IDProducto, Cantidad, PrecioUnitario, Subtotal) VALUES (@IDPedido, @IDProducto, @Cantidad, @PrecioUnitario, @Subtotal)');
        res.json({ message: 'Detalle de pedido actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar detalle de pedido', error });
    }
};

// Eliminar un detalle de pedido
export const deleteDetallePedido  = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('IDDetalle', id)
            .query('DELETE FROM DetallesPedido WHERE IDDetalle = @IDDetalle');
        res.json({ message: 'Detalle de pedido eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar detalle de pedido', error });
    }
};
