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
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getAllCliente = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Cliente
const getAllCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Cliente');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Cliente', error });
    }
});
exports.getAllCliente = getAllCliente;
// Crear un nuevo registro de Cliente
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoCliente = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Usuario', nuevoCliente.Id_Usuario)
            .query('INSERT INTO Cliente (Id_Usuario) VALUES (@Id_Usuario)');
        res.status(201).json({ message: 'Registro de Cliente creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Cliente', error });
    }
});
exports.createCliente = createCliente;
// Actualizar un registro de Cliente
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedCliente = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Id_Usuario', updatedCliente.Id_Usuario)
            .query('UPDATE Cliente SET Id_Usuario = @Id_Usuario WHERE Id_Cliente = @id');
        res.json({ message: 'Registro de Cliente actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Cliente', error });
    }
});
exports.updateCliente = updateCliente;
// Eliminar un registro de Cliente
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Cliente WHERE Id_Cliente = @id');
        res.json({ message: 'Registro de Cliente eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Cliente', error });
    }
});
exports.deleteCliente = deleteCliente;
