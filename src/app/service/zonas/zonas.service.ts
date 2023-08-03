import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private readonly apiUrl = environment.api_reserva;
  constructor(public httpclient: HttpClient) { }

  listaZonas(): Observable<any> {
    const url = `${this.apiUrl}Mesas/ListaZonas`;
    return this.httpclient.get(url);
  }
}
