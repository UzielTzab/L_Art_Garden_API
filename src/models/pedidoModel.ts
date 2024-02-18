// pedidoModel.ts
export interface Pedido {
    Id_Pedidos?: number;
    Id_Compra: number;
    Proceso: string;
    Motivo_Cancelacion: string;
    Motivo_Devolucion: string;
    Imagen: string; // Puedes manejar la imagen como una URL
}
