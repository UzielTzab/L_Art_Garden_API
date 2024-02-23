// direccionesEnvioModel.ts
export interface DireccionEnvio {
    IDDireccion?: number;
    IDUsuarioCliente: number;
    NombreCompletoDestinatario: string;
    DireccionEnvio: string;
    Ciudad: string;
    CodigoPostal: string;
    Pais: string;
    Telefono: string;
}
