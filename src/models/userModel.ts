// userModel.ts
export interface User {
    id_Usuario?: number;
    Nombre: string;
    Fecha_Nacimiento: String;
    Telefono: string;
    Correo_Electronico: string;
    Contraseña: string;
    Genero: string;
    Tipo_Usuario: number;
    Foto?: string; // Puedes cambiar el tipo
}
