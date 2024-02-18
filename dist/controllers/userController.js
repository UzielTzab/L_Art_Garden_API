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
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los usuarios
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield poolito.request().query('SELECT * FROM Usuario');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});
exports.getAllUsers = getAllUsers;
// Obtener un usuario por ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield poolito.request()
            .input('id', id)
            .query('SELECT * FROM Usuario WHERE id_Usuario = @id');
        res.json(result.recordset[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
});
exports.getUserById = getUserById;
// Crear un nuevo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield poolito.request()
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
    }
    catch (error) {
        console.log(req.body);
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
});
exports.createUser = createUser;
// Actualizar un usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield poolito.request()
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
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
});
exports.updateUser = updateUser;
// Eliminar un usuario
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield poolito.request()
            .input('id', id)
            .query('DELETE FROM Usuario WHERE id_Usuario = @id');
        res.json({ message: 'Usuario eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
});
exports.deleteUser = deleteUser;
//Actualizar un dato del usuario
const patchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedFields = req.body; // Obtenemos los campos actualizados del cuerpo de la solicitud
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const request = poolito.request();
        // Comprobamos qué campos se quieren actualizar
        const fieldsToUpdate = Object.keys(updatedFields).filter(field => field !== 'id');
        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }
        // Construimos la consulta SQL dinámicamente utilizando los campos actualizados
        let query = 'UPDATE Usuario SET ';
        const inputs = {}; // Objeto para almacenar los valores de los campos actualizados
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
        yield request.query(query);
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
});
exports.patchUser = patchUser;
