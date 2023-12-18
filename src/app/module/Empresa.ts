export class Empresa {
    Empresa_id: number;
    Nombre: String;
    AtencionDiaInicio: number;
    AtencionDiaFin: number;
    AtencionHoraInicio: string;
    AtencionHoraFin: string;
    Telefono: string;
    Personas: number;
    correo: string;
    direccion: string;
}

export class EmpresaAcceso {
    Usuario: string;
    Password: string;
}