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
exports.deleteFloreria = exports.updateFloreria = exports.createFloreria = exports.getAllFlorerias = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todas las florerías
const getAllFlorerias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolExportito = yield dbConfig_1.poolExport.connect();
        const result = yield poolExportito.request().query('SELECT * FROM Florerias');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener florerías', error });
    }
});
exports.getAllFlorerias = getAllFlorerias;
// Crear una nueva florería
const createFloreria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaFloreria = req.body;
    try {
        const poolExportito = yield dbConfig_1.poolExport.connect();
        const result = yield poolExportito.request()
            .input('IDUsuarioVendedor', nuevaFloreria.IDUsuarioVendedor)
            .input('IDInventario', nuevaFloreria.IDInventario)
            .input('NombreFloreria', nuevaFloreria.NombreFloreria)
            .input('Descripcion', nuevaFloreria.Descripcion)
            .input('Direccion', nuevaFloreria.Direccion)
            .input('Telefono', nuevaFloreria.Telefono)
            .input('CorreoElectronico', nuevaFloreria.CorreoElectronico)
            .input('RedesSociales', nuevaFloreria.RedesSociales)
            .input('Foto', nuevaFloreria.Foto)
            .query('INSERT INTO Florerias (IDUsuarioVendedor, IDInventario, NombreFloreria, Descripcion, Direccion, Telefono, CorreoElectronico, RedesSociales, Foto) VALUES (@IDUsuarioVendedor, @IDInventario, @NombreFloreria, @Descripcion, @Direccion, @Telefono, @CorreoElectronico, @RedesSociales, @Foto)');
        res.status(201).json({ message: 'Florería creada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear florería', error });
    }
});
exports.createFloreria = createFloreria;
// Actualizar una florería
const updateFloreria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedFloreria = req.body;
    try {
        const poolExportito = yield dbConfig_1.poolExport.connect();
        const result = yield poolExportito.request()
            .input('ID', id)
            .input('IDUsuarioVendedor', updatedFloreria.IDUsuarioVendedor)
            .input('IDInventario', updatedFloreria.IDInventario)
            .input('NombreFloreria', updatedFloreria.NombreFloreria)
            .input('Descripcion', updatedFloreria.Descripcion)
            .input('Direccion', updatedFloreria.Direccion)
            .input('Telefono', updatedFloreria.Telefono)
            .input('CorreoElectronico', updatedFloreria.CorreoElectronico)
            .input('RedesSociales', updatedFloreria.RedesSociales)
            .input('Foto', updatedFloreria.Foto)
            .query('UPDATE Florerias SET IDUsuarioVendedor = @IDUsuarioVendedor, IDInventario = @IDInventario, NombreFloreria = @NombreFloreria, Descripcion = @Descripcion, Direccion = @Direccion, Telefono = @Telefono, CorreoElectronico = @CorreoElectronico, RedesSociales = @RedesSociales, Foto = @Foto WHERE ID = @ID');
        res.json({ message: 'Florería actualizada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar florería', error });
    }
});
exports.updateFloreria = updateFloreria;
// Eliminar una florería
const deleteFloreria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolExportito = yield dbConfig_1.poolExport.connect();
        const result = yield poolExportito.request()
            .input('ID', id)
            .query('DELETE FROM Florerias WHERE ID = @ID');
        res.json({ message: 'Florería eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar florería', error });
    }
});
exports.deleteFloreria = deleteFloreria;
