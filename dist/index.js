"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const vendedorRoutes_1 = __importDefault(require("./routes/vendedorRoutes"));
const productosCategoriaRoutes_1 = __importDefault(require("./routes/productosCategoriaRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const pedidoDevolucionRoutes_1 = __importDefault(require("./routes/pedidoDevolucionRoutes"));
const pedidoCancelacionRoutes_1 = __importDefault(require("./routes/pedidoCancelacionRoutes"));
const pedidoRoutes_1 = __importDefault(require("./routes/pedidoRoutes"));
const pagoRoutes_1 = __importDefault(require("./routes/pagoRoutes"));
const inventarioRoutes_1 = __importDefault(require("./routes/inventarioRoutes"));
const floreriaRoutes_1 = __importDefault(require("./routes/floreriaRoutes"));
const devolucionRoutes_1 = __importDefault(require("./routes/devolucionRoutes"));
const compraRoutes_1 = __importDefault(require("./routes/compraRoutes"));
const clienteRoutes_1 = __importDefault(require("./routes/clienteRoutes"));
const carritoRoutes_1 = __importDefault(require("./routes/carritoRoutes"));
const cancelacionRoutes_1 = __importDefault(require("./routes/cancelacionRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rutas
app.use('/api', userRoutes_1.default);
app.use('/api', vendedorRoutes_1.default);
app.use('/api', productosCategoriaRoutes_1.default);
app.use('/api', productoRoutes_1.default);
app.use('/api', pedidoDevolucionRoutes_1.default);
app.use('/api', pedidoCancelacionRoutes_1.default);
app.use('/api', pedidoRoutes_1.default);
app.use('/api', pagoRoutes_1.default);
app.use('/api', inventarioRoutes_1.default);
app.use('/api', floreriaRoutes_1.default);
app.use('/api', devolucionRoutes_1.default);
app.use('/api', compraRoutes_1.default);
app.use('/api', clienteRoutes_1.default);
app.use('/api', carritoRoutes_1.default);
app.use('/api', cancelacionRoutes_1.default);
const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
