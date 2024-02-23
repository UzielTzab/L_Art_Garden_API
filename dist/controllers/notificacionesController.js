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
exports.deleteNotificacion = exports.updateNotificacion = exports.createNotificacion = exports.getAllNotificaciones = void 0;
const dbConfig_1 = require("../config/dbConfig");
// Obtener todas las notificaciones
const getAllNotificaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request().query('SELECT * FROM Notificaciones');
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener notificaciones', error });
    }
});
exports.getAllNotificaciones = getAllNotificaciones;
// Crear una nueva notificación
const createNotificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaNotificacion = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDUsuario', nuevaNotificacion.IDUsuario)
            .input('TipoNotificacion', nuevaNotificacion.TipoNotificacion)
            .input('MensajeNotificacion', nuevaNotificacion.MensajeNotificacion)
            .input('FechaHoraNotificacion', nuevaNotificacion.FechaHoraNotificacion)
            .input('EstadoNotificacion', nuevaNotificacion.EstadoNotificacion)
            .query('INSERT INTO Notificaciones (IDUsuario, TipoNotificacion, MensajeNotificacion, FechaHoraNotificacion, EstadoNotificacion) VALUES (@IDUsuario, @TipoNotificacion, @MensajeNotificacion, @FechaHoraNotificacion, @EstadoNotificacion)');
        res.status(201).json({ message: 'Notificación creada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear notificación', error });
    }
});
exports.createNotificacion = createNotificacion;
// Actualizar una notificación
const updateNotificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedNotificacion = req.body;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDNotificacion', id)
            .input('IDUsuario', updatedNotificacion.IDUsuario)
            .input('TipoNotificacion', updatedNotificacion.TipoNotificacion)
            .input('MensajeNotificacion', updatedNotificacion.MensajeNotificacion)
            .input('FechaHoraNotificacion', updatedNotificacion.FechaHoraNotificacion)
            .input('EstadoNotificacion', updatedNotificacion.EstadoNotificacion)
            .query('UPDATE Notificaciones SET IDUsuario = @IDUsuario, TipoNotificacion = @TipoNotificacion, MensajeNotificacion = @MensajeNotificacion, FechaHoraNotificacion = @FechaHoraNotificacion, EstadoNotificacion = @EstadoNotificacion WHERE IDNotificacion = @IDNotificacion');
        res.json({ message: 'Notificación actualizada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar notificación', error });
    }
});
exports.updateNotificacion = updateNotificacion;
// Eliminar una notificación
const deleteNotificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const poolito = yield dbConfig_1.poolExport.connect();
        const result = yield poolito.request()
            .input('IDNotificacion', id)
            .query('DELETE FROM Notificaciones WHERE IDNotificacion = @IDNotificacion');
        res.json({ message: 'Notificación eliminada exitosamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar notificación', error });
    }
});
exports.deleteNotificacion = deleteNotificacion;
