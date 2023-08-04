import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservacionNuevo } from 'src/app/module/reservacion';
@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  private readonly apiUrl = environment.api_reserva;
  constructor(public httpclient: HttpClient) { }

  CreateReservacion(reserva: ReservacionNuevo): Observable<any> {
    const url = `${this.apiUrl}Reservas/CrearReserva`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<ReservacionNuevo>(url, reserva, { headers });
  }


}
