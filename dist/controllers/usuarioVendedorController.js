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
exports.deleteUsuarioVendedor = exports.updateUsuarioVendedor = exports.createUsuarioVendedor = exports.getAllUsuariosVendedor = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los usuarios vendedor
const getAllUsuariosVendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield dbConfig_1.poolExport.request().query('SELECT * FROM UsuarioVendedor');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios vendedor', error });
    }
});
exports.getAllUsuariosVendedor = getAllUsuariosVendedor;
// Crear un nuevo usuario vendedor
const createUsuarioVendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoUsuarioVendedor = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuario', nuevoUsuarioVendedor.IDUsuario)
            .query('INSERT INTO UsuarioVendedor (IDUsuario) VALUES (@IDUsuario)');
        res.status(201).json({ message: 'Usuario vendedor creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear usuario vendedor', error });
    }
});
exports.createUsuarioVendedor = createUsuarioVendedor;
// Actualizar un usuario vendedor
const updateUsuarioVendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedUsuarioVendedor = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuarioVendedor', id)
            .input('IDUsuario', updatedUsuarioVendedor.IDUsuario)
            .query('UPDATE UsuarioVendedor SET IDUsuario = @IDUsuario WHERE IDUsuarioVendedor = @IDUsuarioVendedor');
        res.json({ message: 'Usuario vendedor actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario vendedor', error });
    }
});
exports.updateUsuarioVendedor = updateUsuarioVendedor;
// Eliminar un usuario vendedor
const deleteUsuarioVendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuarioVendedor', id)
            .query('DELETE FROM UsuarioVendedor WHERE IDUsuarioVendedor = @IDUsuarioVendedor');
        res.json({ message: 'Usuario vendedor eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario vendedor', error });
    }
});
exports.deleteUsuarioVendedor = deleteUsuarioVendedor;
