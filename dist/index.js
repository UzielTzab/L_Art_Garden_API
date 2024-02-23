"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cancelacionesRoutes_1 = __importDefault(require("./routes/cancelacionesRoutes"));
const categoriasProductosRoutes_1 = __importDefault(require("./routes/categoriasProductosRoutes"));
const comentariosResenasProductosRoutes_1 = __importDefault(require("./routes/comentariosResenasProductosRoutes"));
const detallesPedidoRoutes_1 = __importDefault(require("./routes/detallesPedidoRoutes"));
const devolucionesRoutes_1 = __importDefault(require("./routes/devolucionesRoutes"));
const direccionesEnvioRoutes_1 = __importDefault(require("./routes/direccionesEnvioRoutes"));
const floreriasRoutes_1 = __importDefault(require("./routes/floreriasRoutes"));
const inventarioRoutes_1 = __importDefault(require("./routes/inventarioRoutes"));
const notificacionesRoutes_1 = __importDefault(require("./routes/notificacionesRoutes"));
const pagosRoutes_1 = __importDefault(require("./routes/pagosRoutes"));
const pedidosRoutes_1 = __importDefault(require("./routes/pedidosRoutes"));
const productosRoutes_1 = __importDefault(require("./routes/productosRoutes"));
const usuarioClienteRoutes_1 = __importDefault(require("./routes/usuarioClienteRoutes"));
const usuarioVendedorRoutes_1 = __importDefault(require("./routes/usuarioVendedorRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rutas
app.use('/api', userRoutes_1.default);
app.use('/api', cancelacionesRoutes_1.default);
app.use('/api', categoriasProductosRoutes_1.default);
app.use('/api', comentariosResenasProductosRoutes_1.default);
app.use('/api', detallesPedidoRoutes_1.default);
app.use('/api', devolucionesRoutes_1.default);
app.use('/api', direccionesEnvioRoutes_1.default);
app.use('/api', floreriasRoutes_1.default);
app.use('/api', inventarioRoutes_1.default);
app.use('/api', notificacionesRoutes_1.default);
app.use('/api', pagosRoutes_1.default);
app.use('/api', pedidosRoutes_1.default);
app.use('/api', productosRoutes_1.default);
app.use('/api', usuarioClienteRoutes_1.default);
app.use('/api', usuarioVendedorRoutes_1.default);
;
const PORT = 3004;
app.listen(PORT, () => {
    console.log(`El servidor fue lanzado en el puerto ${PORT}`);
});
