// devolucionesModel.ts
export interface Devolucion {
    IDDevolucion?: number;
    IDPedidoDevolucion: number;
    FechaHoraDevolucion: Date;
    MotivoDevolucion: string;
    EstadoDevolucion: string;
}