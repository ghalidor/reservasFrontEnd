import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { zonas } from 'src/app/module/zonas';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private readonly apiUrl = environment.api_reserva;
  constructor(public httpclient: HttpClient) { }

  listaZonas(): Observable<any> {
    const url = `${this.apiUrl}Zonas/ListaZonas`;
    return this.httpclient.get(url);
  }

  GetZOnaID(id: number): Observable<any> {
    const url = `${this.apiUrl}zonas/DetalleZona/${id}`;
    return this.httpclient.get(url);
  }

  CreateZona(reserva: zonas): Observable<any> {
    const url = `${this.apiUrl}zonas/Crearzona`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<zonas>(url, reserva, { headers });
  }

  UpdateZona(reserva: zonas): Observable<any> {
    const url = `${this.apiUrl}zonas/Updatezona`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<zonas>(url, reserva, { headers });
  }

}
