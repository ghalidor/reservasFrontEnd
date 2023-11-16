export class ReservacionNuevo {
    Personas: number;
    Fecha: String;
    Hora: string;
    ZonaId: number;
    Nrodocumento: string;
    Nombre: string;
    Telefono: string;
    Mensaje: string;
    Mascotas: boolean;
    Correo: string;
}

export class ReservacionNuevoSinZona {
    Personas: number;
    Fecha: String;
    Hora: string;
    Nrodocumento: string;
    Nombre: string;
    Telefono: string;
    Mensaje: string;
    Mascotas: boolean;
    Correo: string;
}

export class ReservaEstado {
    ReservaId: number;
    Estado:number;
    Motivo:string;
}


export class ListaHorasZonaMesasLibre {
    Hora: string;
    Fecha: Date;
    IsActivo: boolean;
    ZonasLibres: zonasLista[];
}

export class ReservacionLista {
    ReservaId: number;
    Zona: string;
    ZonaId: number;
    NroMesa: string;
    Mesa: string;
    MesaId: string;
    Personas: number;
    Fecha: string;
    Hora: string;
    Mascotas: boolean;
    MascotasString: string;
    Mensaje: string;
    Telefono: string;
    Nombre: string;
    ClaseEstado: string;
    Correo: string;
    Estado:string;
    Motivo:string;
}

export class ReservacionEstado {
    ReservaId: number;
    Estado: number;
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
    Nombre: string;

}