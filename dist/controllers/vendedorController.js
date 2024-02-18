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
exports.deleteVendedor = exports.updateVendedor = exports.createVendedor = exports.getVendedorById = exports.getAllVendedores = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los vendedores
const getAllVendedores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Vendedor');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener vendedores', error });
    }
});
exports.getAllVendedores = getAllVendedores;
// Obtener un vendedor por ID
const getVendedorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request()
            .input('id', id)
            .query('SELECT * FROM Vendedor WHERE Id_Vendedor = @id');
        res.json(result.recordset[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener vendedor', error });
    }
});
exports.getVendedorById = getVendedorById;
// Crear un nuevo vendedor
const createVendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newVendedor = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Usuario', newVendedor.Id_Usuario)
            .query('INSERT INTO Vendedor (Id_Usuario) VALUES (@Id_Usuario)');
        res.status(201).json({ message: 'Vendedor creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear vendedor', error });
    }
});
exports.createVendedor = createVendedor;
// Actualizar un vendedor
const updateVendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedVendedor = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Id_Usuario', updatedVendedor.Id_Usuario)
            .query('UPDATE Vendedor SET Id_Usuario = @Id_Usuario WHERE Id_Vendedor = @id');
        res.json({ message: 'Vendedor actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar vendedor', error });
    }
});
exports.updateVendedor = updateVendedor;
// Eliminar un vendedor
const deleteVendedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Vendedor WHERE Id_Vendedor = @id');
        res.json({ message: 'Vendedor eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar vendedor', error });
    }
});
exports.deleteVendedor = deleteVendedor;
