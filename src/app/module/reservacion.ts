export class ReservacionNuevo {
    Personas: number;
    Fecha: String;
    Hora: string;
    ZonaId: number;
    Nrodocumento:string;
    Nombre:string;
    Telefono:string;
    Mensaje:string;
    Mascotas:boolean;
}

export class ListaHorasZonaMesasLibre {
    Hora: string;
    Fecha: Date;
    IsActivo: boolean;
    ZonasLibres:zonasLista[];
}

export class zonasLista {
    ZonaId: number;
    Descripcion: String;
    SucursalId: number;
    EsActivo: boolean;
    EmpresaId: number;
    Servidor: boolean;
}

export class Reserva {
    ReservaId: number;
    Personas: number;
    Fecha: string;
    Hora: string;
    ZonaId: number;
    Nrodocumento: string;
    Nombre:string;
}