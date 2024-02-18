import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { User } from '../models/userModel';

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const poolito = await pool.connect();
        const result = await poolito.request().query('SELECT * FROM Usuario');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        const result = await poolito.request()
            .input('id', id)
            .query('SELECT * FROM Usuario WHERE id_Usuario = @id');
        res.json(result.recordset[0]);
        
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    const newUser: User = req.body;
    try {
        const poolito = await pool.connect();
        await poolito.request()
            .input('nombre', newUser.Nombre)
            .input('apellido', newUser.Apellido)
            .input('fecha_nacimiento', newUser.Fecha_Nacimiento)
            .input('telefono', newUser.Telefono)
            .input('correo_electronico', newUser.Correo_Electronico)
            .input('contraseña', newUser.Contraseña)
            .input('genero', newUser.Genero)
            .input('verificacion_datos', newUser.Verificacion_Datos)
            .query('INSERT INTO Usuario (Nombre, Apellido, fecha_nacimiento, Telefono, Correo_Electronico, Contraseña, Genero, Verificacion_Datos) VALUES (@Nombre, @Apellido, @Fecha_Nacimiento, @Telefono, @Correo_Electronico, @Contraseña, @Genero, @Verificacion_Datos)');
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.log(req.body);
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser: User = req.body;
    try {
        const poolito = await pool.connect();
        await poolito.request()
            .input('id', id)
            .input('nombre', updatedUser.Nombre)
            .input('apellido', updatedUser.Apellido)
            .input('fecha_nacimiento', updatedUser.Fecha_Nacimiento)
            .input('telefono', updatedUser.Telefono)
            .input('correo_electronico', updatedUser.Correo_Electronico)
            .input('contraseña', updatedUser.Contraseña)
            .input('genero', updatedUser.Genero)
            .input('verificacion_datos', updatedUser.Verificacion_Datos)
            .query('UPDATE Usuario SET Nombre = @nombre, Apellido = @apellido, fecha_nacimiento = @fecha_nacimiento, Telefono = @telefono, Correo_Electronico = @correo_electronico, Contraseña = @contraseña, Genero = @genero, Verificacion_Datos = @verificacion_datos WHERE id_Usuario = @id');
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await pool.connect();
        await poolito.request()
            .input('id', id)
            .query('DELETE FROM Usuario WHERE id_Usuario = @id');
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
};
//Actualizar un dato del usuario
export const patchUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFields = req.body; // Obtenemos los campos actualizados del cuerpo de la solicitud

    try {
        const poolito = await pool.connect();
        const request = poolito.request();

        // Comprobamos qué campos se quieren actualizar
        const fieldsToUpdate = Object.keys(updatedFields).filter(field => field !== 'id');
        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }

        // Construimos la consulta SQL dinámicamente utilizando los campos actualizados
        let query = 'UPDATE Usuario SET ';
        const inputs: any = {}; // Objeto para almacenar los valores de los campos actualizados

        fieldsToUpdate.forEach((field, index) => {
            query += `${field} = @${field}`;
            inputs[field] = updatedFields[field];
            if (index < fieldsToUpdate.length - 1) {
                query += ', ';
            }
        });

        query += ` WHERE id_Usuario = @id`;
        inputs['id'] = id;

        // Ejecutamos la consulta SQL
        Object.keys(inputs).forEach(key => {
            request.input(key, inputs[key]);
        });

        await request.query(query);

        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};