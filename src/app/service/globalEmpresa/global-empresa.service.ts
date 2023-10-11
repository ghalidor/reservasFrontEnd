import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class GlobalEmpresaService {

  constructor(public jwtHelper: JwtHelperService) { }

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

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
