// productoModel.ts
export interface Producto {
    id_Productos?: number;
    Id_Inventario: number;
    Imagen: string; // Puedes manejar la imagen como una URL
    Nombre: string;
    Precio: number;
    Descripcion: string;
}
