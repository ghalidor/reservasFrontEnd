import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservacionNuevo,ReservaEstado,ReservacionNuevoSinZona } from 'src/app/module/reservacion';
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

  CreateReservacionSinZona(reserva: ReservacionNuevoSinZona): Observable<any> {
    const url = `${this.apiUrl}Reservas/CrearReservaSinZona`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<ReservacionNuevoSinZona>(url, reserva, { headers });
  }
  GetReservaHoraZonamesaLibre(fecha: string): Observable<any> {
    const url = `${this.apiUrl}Reservas/ListarReservaHorasZonaMesaLibre/${fecha}`;
    return this.httpclient.get(url);
  }

  GetReservaHora(): Observable<any> {
    const url = `${this.apiUrl}Reservas/ListaHorasQuery`;
    return this.httpclient.get(url);
  }
  

  GetReservas(fechaini: string,fechafin: string): Observable<any> {
    const url = `${this.apiUrl}Reservas/ListarReservas/${fechaini}/${fechafin}`;
    return this.httpclient.get(url);
  }

  GetReservasSinZona(fechaini: string,fechafin: string): Observable<any> {
    const url = `${this.apiUrl}Reservas/ListarReservasSinZonas/${fechaini}/${fechafin}`;
    return this.httpclient.get(url);
  }
  

  UpdateReservacionEstado(reserva: ReservaEstado): Observable<any> {
    const url = `${this.apiUrl}Reservas/UpdateReservasEstado`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post<ReservaEstado>(url, reserva, { headers });
  }
}
