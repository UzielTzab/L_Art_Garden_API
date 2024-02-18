import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Compra } from '../models/compraModel';

// Obtener todos los registros de Compra
export const getAllCompra = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Compra');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Compra', error });
    }
};

// Crear un nuevo registro de Compra
export const createCompra = async (req: Request, res: Response) => {
    const nuevaCompra: Compra = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Carrito', nuevaCompra.Id_Carrito)
            .input('Id_Pago', nuevaCompra.Id_Pago)
            .input('Nombre', nuevaCompra.Nombre)
            .input('Telefono', nuevaCompra.Telefono)
            .input('Correo_Electronico', nuevaCompra.Correo_Electronico)
            .input('Descripcion', nuevaCompra.Descripcion)
            .input('Recoger_Tienda', nuevaCompra.Recoger_Tienda)
            .input('Fecha_Entrega', nuevaCompra.Fecha_Entrega)
            .input('Horario', nuevaCompra.Horario)
            .query('INSERT INTO Compra (Id_Carrito, Id_Pago, Nombre, Telefono, Correo_Electronico, Descripcion, Recoger_Tienda, Fecha_Entrega, Horario) VALUES (@Id_Carrito, @Id_Pago, @Nombre, @Telefono, @Correo_Electronico, @Descripcion, @Recoger_Tienda, @Fecha_Entrega, @Horario)');
        res.status(201).json({ message: 'Registro de Compra creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Compra', error });
    }
};

// Actualizar un registro de Compra
export const updateCompra = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCompra: Compra = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Id_Carrito', updatedCompra.Id_Carrito)
            .input('Id_Pago', updatedCompra.Id_Pago)
            .input('Nombre', updatedCompra.Nombre)
            .input('Telefono', updatedCompra.Telefono)
            .input('Correo_Electronico', updatedCompra.Correo_Electronico)
            .input('Descripcion', updatedCompra.Descripcion)
            .input('Recoger_Tienda', updatedCompra.Recoger_Tienda)
            .input('Fecha_Entrega', updatedCompra.Fecha_Entrega)
            .input('Horario', updatedCompra.Horario)
            .query('UPDATE Compra SET Id_Carrito = @Id_Carrito, Id_Pago = @Id_Pago, Nombre = @Nombre, Telefono = @Telefono, Correo_Electronico = @Correo_Electronico, Descripcion = @Descripcion, Recoger_Tienda = @Recoger_Tienda, Fecha_Entrega = @Fecha_Entrega, Horario = @Horario WHERE Id_Compra = @id');
        res.json({ message: 'Registro de Compra actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Compra', error });
    }
};

// Eliminar un registro de Compra
export const deleteCompra = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Compra WHERE Id_Compra = @id');
        res.json({ message: 'Registro de Compra eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Compra', error });
    }
};
