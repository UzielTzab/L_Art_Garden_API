// pagoModel.ts
export interface Pago {
    Id_Pago?: number;
    Numero_Tarjeta: number;
    Fecha_Vencimiento: Date;
    CSC: number;
    Nombre: string;
    Apellidos: string;
    Direccion: string;
    Colonia: string;
    Ciudad: string;
    Estado: string;
    Codigo_Postal: number;
    Celular: number;
    Correo_Electronico: string;
}
