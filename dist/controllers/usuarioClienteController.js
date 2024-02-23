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
exports.deleteUsuarioCliente = exports.updateUsuarioCliente = exports.createUsuarioCliente = exports.getAllUsuariosCliente = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los usuarios cliente
const getAllUsuariosCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM UsuarioCliente');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios cliente', error });
    }
});
exports.getAllUsuariosCliente = getAllUsuariosCliente;
// Crear un nuevo usuario cliente
const createUsuarioCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoUsuarioCliente = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuario', nuevoUsuarioCliente.IDUsuario)
            .query('INSERT INTO UsuarioCliente (IDUsuario) VALUES (@IDUsuario)');
        res.status(201).json({ message: 'Usuario cliente creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear usuario cliente', error });
    }
});
exports.createUsuarioCliente = createUsuarioCliente;
// Actualizar un usuario cliente
const updateUsuarioCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedUsuarioCliente = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuarioCliente', id)
            .input('IDUsuario', updatedUsuarioCliente.IDUsuario)
            .query('UPDATE UsuarioCliente SET IDUsuario = @IDUsuario WHERE IDUsuarioCliente = @IDUsuarioCliente');
        res.json({ message: 'Usuario cliente actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario cliente', error });
    }
});
exports.updateUsuarioCliente = updateUsuarioCliente;
// Eliminar un usuario cliente
const deleteUsuarioCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuarioCliente', id)
            .query('DELETE FROM UsuarioCliente WHERE IDUsuarioCliente = @IDUsuarioCliente');
        res.json({ message: 'Usuario cliente eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario cliente', error });
    }
});
exports.deleteUsuarioCliente = deleteUsuarioCliente;
