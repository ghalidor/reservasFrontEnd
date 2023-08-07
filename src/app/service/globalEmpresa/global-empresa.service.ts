import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEmpresaService {

  constructor() { }

  public empresaObjeto = new BehaviorSubject<any>({
    Empresa_id: 1,
    Nombre: "FastResto",
    AtencionDiaInicio: 0,
    AtencionDiaFin: 5,
    AtencionHoraInicio: "08:00 AM",
    AtencionHoraFin: "20:00 PM",
    Telefono: "51-2547865",
    Personas: 6
  });
}
