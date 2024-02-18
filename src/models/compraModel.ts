// compraModel.ts
export interface Compra {
    Id_Compra?: number;
    Id_Carrito: number;
    Id_Pago: number;
    Nombre: string;
    Telefono: string;
    Correo_Electronico: string;
    Descripcion: string;
    Recoger_Tienda: boolean;
    Fecha_Entrega: Date;
    Horario: number;
}
