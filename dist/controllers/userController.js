"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByEmailAndPassword = exports.getAllUsers = void 0;
const dbConfig_1 = require("../config/dbConfig");
const sharp_1 = __importDefault(require("sharp"));
// Obtener todos los Usuarioss
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM Usuarios');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener Usuarioss', error });
    }
});
exports.getAllUsers = getAllUsers;
// Obtener un Usuarios por Correo y Contraseña
const getUserByEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo_electronico, contraseña } = req.query;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('correo', correo_electronico)
            .input('contrasena', contraseña)
            .query('SELECT * FROM Usuarios WHERE CorreoElectronico = @correo AND Contraseña = @contrasena');
        res.json(result.recordset[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener Usuarios por correo y contraseña', error });
    }
});
exports.getUserByEmailAndPassword = getUserByEmailAndPassword;
// Crear un nuevo Usuarios  
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    console.log('Datos recibidos del cliente:', newUser);
    // Verificar si se ha proporcionado una foto en la solicitud
    if (!newUser.Foto) {
        newUser.Foto = null;
        try {
            const poolito = yield dbConfig_1.poolExport.connect();
            yield poolito.request()
                .input('nombre', newUser.Nombre)
                .input('fecha_nacimiento', newUser.Fecha_Nacimiento)
                .input('telefono', newUser.Telefono)
                .input('correo_electronico', newUser.Correo_Electronico)
                .input('contraseña', newUser.Contraseña)
                .input('genero', newUser.Genero)
                .input('tipo_usuario', newUser.Tipo_Usuario)
                .query('INSERT INTO Usuarios (NombreUsuario, FechaNacimiento, Telefono, CorreoElectronico, Contraseña, Genero, TipoUsuario) VALUES (@Nombre, @Fecha_Nacimiento, @Telefono, @Correo_Electronico, @Contraseña, @Genero, @Tipo_Usuario)');
            return res.status(201).json({ message: 'Usuario creado exitosamente' });
        }
        catch (error) {
            console.log(`Error al crear usuario: ${error}`);
            return res.status(500).json({ message: 'Error al crear usuario', error });
        }
    }
    else {
        // Convertir la foto de base64 a buffer
        const fotoBuffer = Buffer.from(newUser.Foto, 'base64');
        console.log('Datos binarios de la img comprimida:', fotoBuffer);
        try {
            // Comprimir la imagen utilizando sharp
            const compressedImageBuffer = yield (0, sharp_1.default)(fotoBuffer)
                .resize({ width: 400, height: 400 }) // Cambia el tamaño de la imagen si es necesario
                .jpeg({ quality: 30 }) // Establece la calidad JPEG
                .toBuffer();
            const poolito = yield dbConfig_1.poolExport.connect();
            yield poolito.request()
                .input('nombre', newUser.Nombre)
                .input('fecha_nacimiento', newUser.Fecha_Nacimiento)
                .input('telefono', newUser.Telefono)
                .input('correo_electronico', newUser.Correo_Electronico)
                .input('contraseña', newUser.Contraseña)
                .input('genero', newUser.Genero)
                .input('tipo_usuario', newUser.Tipo_Usuario)
                .input('foto', compressedImageBuffer) // Se pasa el buffer de la imagen comprimida
                .query('INSERT INTO Usuarios (NombreUsuario, FechaNacimiento, Telefono, CorreoElectronico, Contraseña, Genero, TipoUsuario, Foto) VALUES (@Nombre, @Fecha_Nacimiento, @Telefono, @Correo_Electronico, @Contraseña, @Genero, @Tipo_Usuario, @Foto)');
            return res.status(201).json({ message: 'Usuario creado exitosamente' });
        }
        catch (error) {
            console.log("Error al crear usuario:", error);
            return res.status(500).json({ message: 'Error al crear usuario', error });
        }
    }
});
exports.createUser = createUser;
// Actualizar un Usuarios
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        yield poolito.request()
            .input('id', id)
            .input('nombre', updatedUser.Nombre)
            .input('fecha_nacimiento', updatedUser.Fecha_Nacimiento)
            .input('telefono', updatedUser.Telefono)
            .input('correo_electronico', updatedUser.Correo_Electronico)
            .input('contraseña', updatedUser.Contraseña)
            .input('genero', updatedUser.Genero)
            .input('tipo_usuario', updatedUser.Tipo_Usuario)
            .input('Foto', updatedUser.Foto)
            .query('UPDATE Usuarios SET Nombre = @nombre, fecha_nacimiento = @fecha_nacimiento, Telefono = @telefono, Correo_Electronico = @correo_electronico, Contraseña = @contraseña, Genero = @genero, Foto = @Foto WHERE id_Usuarios = @id');
        res.status(200).json({ message: 'Usuarios actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar Usuarios', error });
    }
});
exports.updateUser = updateUser;
// Eliminar un Usuarios
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        yield poolito.request()
            .input('id', id)
            .query('DELETE FROM Usuarios WHERE id_Usuarios = @id');
        res.json({ message: 'Usuarios eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar Usuarios', error });
    }
});
exports.deleteUser = deleteUser;
//Actualizar un dato del Usuarios
const patchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedFields = req.body; // Obtenemos los campos actualizados del cuerpo de la solicitud
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const request = poolito.request();
        // Comprobamos qué campos se quieren actualizar
        const fieldsToUpdate = Object.keys(updatedFields).filter(field => field !== 'id');
        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }
        // Construimos la consulta SQL dinámicamente utilizando los campos actualizados
        let query = 'UPDATE Usuarios SET ';
        const inputs = {}; // Objeto para almacenar los valores de los campos actualizados
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
        yield request.query(query);
        res.status(200).json({ message: 'Usuarios actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar Usuarios', error });
    }
});
exports.patchUser = patchUser;
