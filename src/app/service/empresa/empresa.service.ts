import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from 'src/app/module/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private readonly apiUrl = environment.api_reserva;
  constructor(public httpclient: HttpClient) { }

  RegistroEmpresa(): Observable<any> {
    const url = `${this.apiUrl}Empresa/RegistroEmpresa`;
    return this.httpclient.get(url);
  }

  UpdateEmpresa(reserva: Empresa): Observable<any> {
    const url = `${this.apiUrl}Empresa/UpdateEmpresa`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<Empresa>(url, reserva, { headers });
  }
}
