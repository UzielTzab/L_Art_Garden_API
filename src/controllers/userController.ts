import { Request, Response } from 'express';
import { poolExport } from '../config/dbConfig';
import { User } from '../models/userModel';
import sharp from 'sharp';
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

// Obtener un Usuarios por Correo y Contraseña
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
    const newUser = req.body;

    // Verificar si se ha proporcionado una foto en la solicitud
    if (!newUser.Foto) {
        return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen.' });
    }

    // Convertir la foto de base64 a buffer
    const fotoBuffer = Buffer.from(newUser.Foto, 'base64');

    try {
        // Comprimir la imagen utilizando sharp
        const compressedImageBuffer = await sharp(fotoBuffer)
            .resize({ width: 800, height: 600 }) // Cambia el tamaño de la imagen si es necesario
            .jpeg({ quality: 80 }) // Establece la calidad JPEG
            .toBuffer();

        const poolito = await poolExport.connect();
        await poolito.request()
            .input('nombre', newUser.Nombre)
            .input('fecha_nacimiento', newUser.Fecha_Nacimiento)
            .input('telefono', newUser.Telefono)
            .input('correo_electronico', newUser.Correo_Electronico)
            .input('contraseña', newUser.Contraseña)
            .input('genero', newUser.Genero)
            .input('tipo_usuario', newUser.Tipo_Usuario)
            .input('foto', compressedImageBuffer) // Se pasa el buffer de la imagen comprimida
            .query('INSERT INTO Usuarios (NombreUsuario, FechaNacimiento, Telefono, CorreoElectronico, Contraseña, Genero, TipoUsuario, Foto) VALUES (@Nombre, @Fecha_Nacimiento, @Telefono, @Correo_Electronico, @Contraseña, @Genero, @Tipo_Usuario, @Foto)');
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.log("Error al crear usuario:", error);
        res.status(500).json({ message: 'Error al crear usuario', error });
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
            .input('tipo_usuario',updatedUser.Tipo_Usuario)
            .input('Foto', updatedUser.Foto)
            .query('UPDATE Usuarios SET Nombre = @nombre, fecha_nacimiento = @fecha_nacimiento, Telefono = @telefono, Correo_Electronico = @correo_electronico, Contraseña = @contraseña, Genero = @genero, Foto = @Foto WHERE id_Usuarios = @id');
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