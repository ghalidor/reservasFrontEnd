import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mesas } from 'src/app/module/mesas';

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  private readonly apiUrl = environment.api_reserva;
  constructor(public httpclient: HttpClient) { }
  
  listaMesas(): Observable<any> {
    const url = `${this.apiUrl}Mesas/ListaMesas`;
    return this.httpclient.get(url);
  }

  ListaMesasxZona(zona:number): Observable<any> {
    const url = `${this.apiUrl}Mesas/ListaMesasxZona/${zona}`;
    return this.httpclient.get(url);
  }

  GetMesaID(id: number): Observable<any> {
    const url = `${this.apiUrl}Mesas/DetalleMesa/${id}`;
    return this.httpclient.get(url);
  }

  CreateMesa(reserva: mesas): Observable<any> {
    const url = `${this.apiUrl}Mesas/CrearMesa`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<mesas>(url, reserva, { headers });
  }

  UpdateMesa(reserva: mesas): Observable<any> {
    const url = `${this.apiUrl}Mesas/UpdateMesa`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<mesas>(url, reserva, { headers });
  }
}
