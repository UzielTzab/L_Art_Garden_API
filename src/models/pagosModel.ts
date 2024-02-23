// pagosModel.ts
export interface Pago {
    IDPago?: number;
    IDPedido: number;
    MetodoPago: string;
    FechaHoraPago: Date;
    MontoTotalPago: number;
    EstadoPago: string;
}
