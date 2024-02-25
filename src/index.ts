import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import cancelacionesRoutes from './routes/cancelacionesRoutes';
import categoriasProductosRoutes from './routes/categoriasProductosRoutes';
import comentariosResenasProductosRoutes from './routes/comentariosResenasProductosRoutes';
import detallesPedidoRoutes from './routes/detallesPedidoRoutes';
import devolucionesRoutes from './routes/devolucionesRoutes';
import direccionesEnvioRoutes from './routes/direccionesEnvioRoutes';
import floreriasRoutes from './routes/floreriasRoutes';
import inventarioRoutes from './routes/inventarioRoutes';
import notificacionesRoutes from './routes/notificacionesRoutes';
import pagosRoutes from './routes/pagosRoutes';
import pedidosRoutes from './routes/pedidosRoutes';
import productosRoutes from './routes/productosRoutes';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', userRoutes);
app.use('/api', cancelacionesRoutes);
app.use('/api', categoriasProductosRoutes);
app.use('/api', comentariosResenasProductosRoutes);
app.use('/api', detallesPedidoRoutes);
app.use('/api', devolucionesRoutes);
app.use('/api', direccionesEnvioRoutes);
app.use('/api', floreriasRoutes);
app.use('/api', inventarioRoutes);
app.use('/api', notificacionesRoutes);
app.use('/api', pagosRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', productosRoutes);


const PORT = 3004;

app.listen(PORT, () => {
    console.log(`El servidor fue lanzado en el puerto ${PORT}`);
});
