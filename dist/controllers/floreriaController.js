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
exports.deleteFloreria = exports.updateFloreria = exports.createFloreria = exports.getAllFloreria = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todos los registros de Floreria
const getAllFloreria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.pool.connect();
        const result = yield dbConfig_1.pool.request().query('SELECT * FROM Floreria');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener registros de Floreria', error });
    }
});
exports.getAllFloreria = getAllFloreria;
// Crear un nuevo registro de Floreria
const createFloreria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaFloreria = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('Id_Vendedor', nuevaFloreria.Id_Vendedor)
            .input('Id_Inventario', nuevaFloreria.Id_Inventario)
            .input('Imagen', nuevaFloreria.Imagen)
            .input('Nombre', nuevaFloreria.Nombre)
            .input('Descripcion', nuevaFloreria.Descripcion)
            .input('Telefono', nuevaFloreria.Telefono)
            .input('Correo_Electronico', nuevaFloreria.Correo_Electronico)
            .input('Redes_Sociales', nuevaFloreria.Redes_Sociales)
            .input('Direccion', nuevaFloreria.Direccion)
            .input('Codigo_Postal', nuevaFloreria.Codigo_Postal)
            .input('Municipio', nuevaFloreria.Municipio)
            .query('INSERT INTO Floreria (Id_Vendedor, Id_Inventario, Imagen, Nombre, Descripcion, Telefono, Correo_Electronico, Redes_Sociales, Direccion, Codigo_Postal, Municipio) VALUES (@Id_Vendedor, @Id_Inventario, @Imagen, @Nombre, @Descripcion, @Telefono, @Correo_Electronico, @Redes_Sociales, @Direccion, @Codigo_Postal, @Municipio)');
        res.status(201).json({ message: 'Registro de Floreria creado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear registro de Floreria', error });
    }
});
exports.createFloreria = createFloreria;
// Actualizar un registro de Floreria
const updateFloreria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedFloreria = req.body;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .input('Id_Vendedor', updatedFloreria.Id_Vendedor)
            .input('Id_Inventario', updatedFloreria.Id_Inventario)
            .input('Imagen', updatedFloreria.Imagen)
            .input('Nombre', updatedFloreria.Nombre)
            .input('Descripcion', updatedFloreria.Descripcion)
            .input('Telefono', updatedFloreria.Telefono)
            .input('Correo_Electronico', updatedFloreria.Correo_Electronico)
            .input('Redes_Sociales', updatedFloreria.Redes_Sociales)
            .input('Direccion', updatedFloreria.Direccion)
            .input('Codigo_Postal', updatedFloreria.Codigo_Postal)
            .input('Municipio', updatedFloreria.Municipio)
            .query('UPDATE Floreria SET Id_Vendedor = @Id_Vendedor, Id_Inventario = @Id_Inventario, Imagen = @Imagen, Nombre = @Nombre, Descripcion = @Descripcion, Telefono = @Telefono, Correo_Electronico = @Correo_Electronico, Redes_Sociales = @Redes_Sociales, Direccion = @Direccion, Codigo_Postal = @Codigo_Postal, Municipio = @Municipio WHERE Id_Floreria = @id');
        res.json({ message: 'Registro de Floreria actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar registro de Floreria', error });
    }
});
exports.updateFloreria = updateFloreria;
// Eliminar un registro de Floreria
const deleteFloreria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.pool.connect();
        yield dbConfig_1.pool.request()
            .input('id', id)
            .query('DELETE FROM Floreria WHERE Id_Floreria = @id');
        res.json({ message: 'Registro de Floreria eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar registro de Floreria', error });
    }
});
exports.deleteFloreria = deleteFloreria;
