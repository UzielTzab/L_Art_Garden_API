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
exports.deleteDireccionEnvio = exports.updateDireccionEnvio = exports.createDireccionEnvio = exports.getAllDireccionesEnvio = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todas las direcciones de envío
const getAllDireccionesEnvio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM DireccionesEnvio');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener direcciones de envío', error });
    }
});
exports.getAllDireccionesEnvio = getAllDireccionesEnvio;
// Crear una nueva dirección de envío
const createDireccionEnvio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaDireccionEnvio = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuarioCliente', nuevaDireccionEnvio.IDUsuarioCliente)
            .input('NombreCompletoDestinatario', nuevaDireccionEnvio.NombreCompletoDestinatario)
            .input('DireccionEnvio', nuevaDireccionEnvio.DireccionEnvio)
            .input('Ciudad', nuevaDireccionEnvio.Ciudad)
            .input('CodigoPostal', nuevaDireccionEnvio.CodigoPostal)
            .input('Pais', nuevaDireccionEnvio.Pais)
            .input('Telefono', nuevaDireccionEnvio.Telefono)
            .query('INSERT INTO DireccionesEnvio (IDUsuarioCliente, NombreCompletoDestinatario, DireccionEnvio, Ciudad, CodigoPostal, Pais, Telefono) VALUES (@IDUsuarioCliente, @NombreCompletoDestinatario, @DireccionEnvio, @Ciudad, @CodigoPostal, @Pais, @Telefono)');
        res.status(201).json({ message: 'Dirección de envío creada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear dirección de envío', error });
    }
});
exports.createDireccionEnvio = createDireccionEnvio;
// Actualizar una dirección de envío
const updateDireccionEnvio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedDireccionEnvio = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDDireccion', id)
            .input('IDUsuarioCliente', updatedDireccionEnvio.IDUsuarioCliente)
            .input('NombreCompletoDestinatario', updatedDireccionEnvio.NombreCompletoDestinatario)
            .input('DireccionEnvio', updatedDireccionEnvio.DireccionEnvio)
            .input('Ciudad', updatedDireccionEnvio.Ciudad)
            .input('CodigoPostal', updatedDireccionEnvio.CodigoPostal)
            .input('Pais', updatedDireccionEnvio.Pais)
            .input('Telefono', updatedDireccionEnvio.Telefono)
            .query('UPDATE DireccionesEnvio SET IDUsuarioCliente = @IDUsuarioCliente, NombreCompletoDestinatario = @NombreCompletoDestinatario, DireccionEnvio = @DireccionEnvio, Ciudad = @Ciudad, CodigoPostal = @CodigoPostal, Pais = @Pais, Telefono = @Telefono WHERE IDDireccion = @IDDireccion');
        res.json({ message: 'Dirección de envío actualizada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar dirección de envío', error });
    }
});
exports.updateDireccionEnvio = updateDireccionEnvio;
// Eliminar una dirección de envío
const deleteDireccionEnvio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDDireccion', id)
            .query('DELETE FROM DireccionesEnvio WHERE IDDireccion = @IDDireccion');
        res.json({ message: 'Dirección de envío eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar dirección de envío', error });
    }
});
exports.deleteDireccionEnvio = deleteDireccionEnvio;
