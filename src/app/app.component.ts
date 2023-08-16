import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GlobalEmpresaService } from './service/globalEmpresa/global-empresa.service';
import { EmpresaService } from './service/empresa/empresa.service';
import { Empresa } from './module/Empresa';
import { Router } from '@angular/router';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Reservas';
  empresa = new Empresa;
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;
  constructor(private empresaService: EmpresaService,
    private globalEmpresaService: GlobalEmpresaService,
    private router: Router
  ) {
    // this.globalEmpresaService.empresaObjeto.subscribe({
    //   next: newValue => console.log('Update Detected:', newValue)
    // });

  }

  ngOnInit(): void {
    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  ngAfterViewInit(): void {
   // this.RegistroEmpresa();
  }


  RegistroEmpresa() {
    this.empresaService.RegistroEmpresa().subscribe({
      next: response => {
        this.empresa = response.data;
        if (this.empresa != null) {
          this.globalEmpresaService.empresaObjeto.next({
            Empresa_id: this.empresa.Empresa_id,
            Nombre: this.empresa.Nombre,
            AtencionDiaInicio: this.empresa.AtencionDiaInicio,
            AtencionDiaFin: this.empresa.AtencionDiaFin,
            AtencionHoraInicio: this.empresa.AtencionHoraInicio,
            AtencionHoraFin: this.empresa.AtencionHoraFin,
            Telefono: this.empresa.Telefono,
            Personas: this.empresa.Personas
          });

        }
      },
      complete: () => {
        this.router.navigate(['inicio']);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        console.log('status', status);
        this.networkStatus = status;
      });
  }
}
