import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { Floreria } from '../models/floreriaModel';

// Obtener todos los registros de Floreria
export const getAllFloreria = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await pool.request().query('SELECT * FROM Floreria');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Floreria', error });
    }
};

// Crear un nuevo registro de Floreria
export const createFloreria = async (req: Request, res: Response) => {
    const nuevaFloreria: Floreria = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('Id_Vendedor', nuevaFloreria.Id_Vendedor)
            .input('Id_Inventario', nuevaFloreria.Id_Inventario)
            .input('Imagen', nuevaFloreria.Imagen)
            .input('Nombre', nuevaFloreria.Nombre)
            .input('Descripcion', nuevaFloreria.Descripcion)
            .input('Telefono', nuevaFloreria.Telefono)
            .input('Correo_Electronico', nuevaFloreria.Correo_Electronico)
            .input('Redes_Sociales', nuevaFloreria.Redes_Sociales)
            .input('Direccion', nuevaFloreria.Direccion)
            .input('Codigo_Postal', nuevaFloreria.Codigo_Postal)
            .input('Municipio', nuevaFloreria.Municipio)
            .query('INSERT INTO Floreria (Id_Vendedor, Id_Inventario, Imagen, Nombre, Descripcion, Telefono, Correo_Electronico, Redes_Sociales, Direccion, Codigo_Postal, Municipio) VALUES (@Id_Vendedor, @Id_Inventario, @Imagen, @Nombre, @Descripcion, @Telefono, @Correo_Electronico, @Redes_Sociales, @Direccion, @Codigo_Postal, @Municipio)');
        res.status(201).json({ message: 'Registro de Floreria creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Floreria', error });
    }
};

// Actualizar un registro de Floreria
export const updateFloreria = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFloreria: Floreria = req.body;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .input('Id_Vendedor', updatedFloreria.Id_Vendedor)
            .input('Id_Inventario', updatedFloreria.Id_Inventario)
            .input('Imagen', updatedFloreria.Imagen)
            .input('Nombre', updatedFloreria.Nombre)
            .input('Descripcion', updatedFloreria.Descripcion)
            .input('Telefono', updatedFloreria.Telefono)
            .input('Correo_Electronico', updatedFloreria.Correo_Electronico)
            .input('Redes_Sociales', updatedFloreria.Redes_Sociales)
            .input('Direccion', updatedFloreria.Direccion)
            .input('Codigo_Postal', updatedFloreria.Codigo_Postal)
            .input('Municipio', updatedFloreria.Municipio)
            .query('UPDATE Floreria SET Id_Vendedor = @Id_Vendedor, Id_Inventario = @Id_Inventario, Imagen = @Imagen, Nombre = @Nombre, Descripcion = @Descripcion, Telefono = @Telefono, Correo_Electronico = @Correo_Electronico, Redes_Sociales = @Redes_Sociales, Direccion = @Direccion, Codigo_Postal = @Codigo_Postal, Municipio = @Municipio WHERE Id_Floreria = @id');
        res.json({ message: 'Registro de Floreria actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Floreria', error });
    }
};

// Eliminar un registro de Floreria
export const deleteFloreria = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await pool.request()
            .input('id', id)
            .query('DELETE FROM Floreria WHERE Id_Floreria = @id');
        res.json({ message: 'Registro de Floreria eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Floreria', error });
    }
};
