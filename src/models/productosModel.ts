// productosModel.ts
export interface Producto {
    IDProducto?: number;
    IDCategoria: number;
    IDInventario: number;
    NombreProducto: string;
    Descripcion: string;
    Precio: number;
    Imagen?: Buffer;
}