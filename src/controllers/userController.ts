import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { User } from '../models/userModel';

// Obtener todos los Usuarioss
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request().query('SELECT * FROM Usuarios');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Usuarioss', error });
    }
};

// Obtener un Usuarios por Corro y Contraseña
export const getUserByEmailAndPassword = async (req: Request, res: Response) => {
    const { correo_electronico, contraseña } = req.query;
    try {
        const poolito = await poolExport.connect();
        const result = await poolito.request()
            .input('correo', correo_electronico)
            .input('contrasena', contraseña)
            .query('SELECT * FROM Usuarios WHERE CorreoElectronico = @correo AND Contraseña = @contrasena');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Usuarios por correo y contraseña', error });
    }
};

// Crear un nuevo Usuarios  
export const createUser = async (req: Request, res: Response) => {
    const newUser: User = req.body;
    try {
        const poolito = await poolExport.connect();
        await poolito.request()
            .input('nombre', newUser.Nombre)
            .input('fecha_nacimiento', newUser.Fecha_Nacimiento)
            .input('telefono', newUser.Telefono)
            .input('correo_electronico', newUser.Correo_Electronico)
            .input('contraseña', newUser.Contraseña)
            .input('genero', newUser.Genero)
            .query('INSERT INTO Usuarios (NombreUsuario, FechaNacimiento, Telefono, CorreoElectronico, Contraseña, Genero) VALUES (@Nombre, @Fecha_Nacimiento, @Telefono, @Correo_Electronico, @Contraseña, @Genero)');
        res.status(201).json({ message: 'Usuarios creado exitosamente' });
    } catch (error) {
        console.log(req.body);
        console.log("Error al crear ususario");
        res.status(500).json({ message: 'Error al crear Usuarios', error });
    }
};

// Actualizar un Usuarios
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser: User = req.body;
    try {
        const poolito = await poolExport.connect();
        await poolito.request()
            .input('id', id)
            .input('nombre', updatedUser.Nombre)
            .input('fecha_nacimiento', updatedUser.Fecha_Nacimiento)
            .input('telefono', updatedUser.Telefono)
            .input('correo_electronico', updatedUser.Correo_Electronico)
            .input('contraseña', updatedUser.Contraseña)
            .input('genero', updatedUser.Genero)
            .query('UPDATE Usuarios SET Nombre = @nombre, fecha_nacimiento = @fecha_nacimiento, Telefono = @telefono, Correo_Electronico = @correo_electronico, Contraseña = @contraseña, Genero = @genero WHERE id_Usuarios = @id');
        res.status(200).json({ message: 'Usuarios actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar Usuarios', error });
    }
};

// Eliminar un Usuarios
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const poolito = await poolExport.connect();
        await poolito.request()
            .input('id', id)
            .query('DELETE FROM Usuarios WHERE id_Usuarios = @id');
        res.json({ message: 'Usuarios eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar Usuarios', error });
    }
};
//Actualizar un dato del Usuarios
export const patchUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFields = req.body; // Obtenemos los campos actualizados del cuerpo de la solicitud

    try {
        const poolito = await poolExport.connect();
        const request = poolito.request();

        // Comprobamos qué campos se quieren actualizar
        const fieldsToUpdate = Object.keys(updatedFields).filter(field => field !== 'id');
        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }

        // Construimos la consulta SQL dinámicamente utilizando los campos actualizados
        let query = 'UPDATE Usuarios SET ';
        const inputs: any = {}; // Objeto para almacenar los valores de los campos actualizados

        fieldsToUpdate.forEach((field, index) => {
            query += `${field} = @${field}`;
            inputs[field] = updatedFields[field];
            if (index < fieldsToUpdate.length - 1) {
                query += ', ';
            }
        });

        query += ` WHERE id_Usuarios = @id`;
        inputs['id'] = id;

        // Ejecutamos la consulta SQL
        Object.keys(inputs).forEach(key => {
            request.input(key, inputs[key]);
        });

        await request.query(query);

        res.status(200).json({ message: 'Usuarios actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar Usuarios', error });
    }
};