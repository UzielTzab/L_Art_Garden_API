// pedidosModel.ts
export interface Pedido {
    IDPedido?: number;
    IDUsuarioCliente: number;
    IDUsuarioVendedor: number;
    FechaHoraPedido: Date;
    EstadoPedido: string;
}
