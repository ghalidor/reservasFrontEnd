import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
