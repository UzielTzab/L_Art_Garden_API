import express from 'express';
import { pool } from './config/dbConfig';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import vendedorRoutes from './routes/vendedorRoutes';
import productosCategoriaRoutes from './routes/productosCategoriaRoutes';
import productoRoutes from './routes/productoRoutes';
import pedidoDevolucionRoutes from './routes/pedidoDevolucionRoutes';
import pedidoCancelacionRoutes from './routes/pedidoCancelacionRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import pagoRoutes from './routes/pagoRoutes';
import inventarioRoutes from './routes/inventarioRoutes';
import floreriaRoutes from './routes/floreriaRoutes';
import devolucionRoutes from './routes/devolucionRoutes';
import compraRoutes from './routes/compraRoutes';
import clienteRoutes from './routes/clienteRoutes';
import carritoRoutes from './routes/carritoRoutes';
import cancelacionRoutes from './routes/cancelacionRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', userRoutes);
app.use('/api', vendedorRoutes);
app.use('/api', productosCategoriaRoutes);
app.use('/api', productoRoutes);
app.use('/api', pedidoDevolucionRoutes);
app.use('/api', pedidoCancelacionRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', pagoRoutes);
app.use('/api', inventarioRoutes);
app.use('/api', floreriaRoutes);
app.use('/api', devolucionRoutes);
app.use('/api', compraRoutes);
app.use('/api', clienteRoutes);
app.use('/api', carritoRoutes);
app.use('/api', cancelacionRoutes);

const PORT = 3004;

app.listen(PORT, () => {
    console.log(`El servidor fue lanzado en el puerto ${PORT}`);
});
