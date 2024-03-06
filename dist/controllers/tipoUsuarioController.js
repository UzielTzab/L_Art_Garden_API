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
exports.deleteTipoUsuario = exports.updateTipoUsuario = exports.createTipoUsuario = exports.getAllTipoUsuarios = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los tipos de usuario
const getAllTipoUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM TipoUsuario');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener tipos de usuario', error });
    }
});
exports.getAllTipoUsuarios = getAllTipoUsuarios;
// Crear un nuevo tipo de usuario
const createTipoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoTipoUsuario = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('Tipo', nuevoTipoUsuario.Tipo)
            .query('INSERT INTO TipoUsuario (Tipo) VALUES (@Tipo)');
        res.status(201).json({ message: 'Tipo de usuario creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear tipo de usuario', error });
    }
});
exports.createTipoUsuario = createTipoUsuario;
// Actualizar un tipo de usuario
const updateTipoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedTipoUsuario = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('ID', id)
            .input('Tipo', updatedTipoUsuario.Tipo)
            .query('UPDATE TipoUsuario SET Tipo = @Tipo WHERE ID = @ID');
        res.json({ message: 'Tipo de usuario actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar tipo de usuario', error });
    }
});
exports.updateTipoUsuario = updateTipoUsuario;
// Eliminar un tipo de usuario
const deleteTipoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('ID', id)
            .query('DELETE FROM TipoUsuario WHERE ID = @ID');
        res.json({ message: 'Tipo de usuario eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar tipo de usuario', error });
    }
});
exports.deleteTipoUsuario = deleteTipoUsuario;
