// pagosModel.ts
export interface Pago {
    IDPago?: number;
    IDUsuario: number;
    IDPedido: number;
    IDMetodo: string;
    FechaHoraPago: Date;
    MontoTotalPagado: number;
    IDEstado: number;
}
