// comentariosResenasProductosModel.ts
export interface ComentarioResenaProducto {
    IDComentario?: number;
    IDUsuarioCliente: number;
    IDProducto: number;
    TextoComentario: string;
    Puntuacion: number;
    FechaHoraComentario: Date;
}
