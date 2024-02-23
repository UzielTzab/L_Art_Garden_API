// floreriasModel.ts
export interface Floreria {
    ID?: number;
    IDUsuarioVendedor: number;
    IDInventario: number;
    NombreFloreria: string;
    Descripcion: string;
    Direccion: string;
    Telefono: string;
    CorreoElectronico: string;
    RedesSociales: string;
    Foto?: Buffer;
}
