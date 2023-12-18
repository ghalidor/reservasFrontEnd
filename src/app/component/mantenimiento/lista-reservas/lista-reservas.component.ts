import { Component, OnInit, ViewChild, TemplateRef, OnDestroy,AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import moment from 'moment';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ReservacionService } from 'src/app/service/reservacion/reservacion.service';
import { ReservacionNuevo, ReservaEstado, ReservacionLista } from 'src/app/module/reservacion';
import { MesasZonasComponent } from '../mesas-zonas/mesas-zonas.component';
import { ParametrosComponent } from '../parametros/parametros.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit, OnDestroy {
  images = ['canete5.jpg', 'canete5.jpg', 'canete5.jpg','border.png'].map((n) => `assets/img/${n}`);
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  moment = moment;
  fechaini: Date;
  fechafin: Date;
  mostrar: boolean;
  estado_id: any;
  reservaId: any;
  motivo:string;
  listaReserva: ReservacionLista[];

  estadoCambiarReservacion=new ReservaEstado();
  detalleReservacion=new ReservacionLista();
  @ViewChild('modalConfirmacion') public templateModalConfirmacion: TemplateRef<any>;
  @ViewChild('modalData') public templateModalData: TemplateRef<any>;
  constructor(private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private reservacionService: ReservacionService,private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.motivo="";
    this.estado_id=null;
    this.listaReserva = [];
    this.mostrar = true;
    this.fechaini = new Date();
    this.fechafin = new Date();
    this.dtOptions = {
      destroy: true,
      scrollX:true,
      language: {
        url: 'assets/js/es-mx.json'
      },
      pagingType: 'first_last_numbers',
      pageLength: 10,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
      // language: {
      //   url: 'assets/es-mx.json'
      // },
      dom:
        "<'row mb-2'<'col-12' <'row'<'col-3 col-md-3'l><'col-md-9 col-9'f> >>>" +
        "<'row'<'col-12 mt-2'tr>>" +
        "<'row'<'col-5'i><'col-7'p>>",
      

        responsive: true,
      processing: true,
      autoWidth: true,
      scrollCollapse: false,
      order: [],
      "columnDefs": [{
        "targets": 6,
        "orderable": false
      }],
    };
    this.ListaReserva();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  buscar() {
    this.ListaReserva();
  }

  ListaReserva() {

    if (this.dtElement != null) {
      if (this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
        });
      }
    }

    this.mostrar = false;
    var fechaini = moment(this.fechaini, "DD-MM-YYYY").format("YYYY-MM-DD");
    var fechafin = moment(this.fechafin, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.reservacionService.GetReservasSinZona(fechaini, fechafin).subscribe({
      next: response => {

        this.listaReserva = response.data;
        this.dtTrigger.next(0);
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //   // Destroy the table first
        //   dtInstance.destroy();
        //   dtInstance.columns.adjust().draw()
        // });
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }


  ReservacionCambiarEstado() {
    console.log(this.estado_id)
    if (this.estado_id == null || this.motivo=="") {
      this.toastr.warning("Seleccione Estado");
    }
    else {
      this.estadoCambiarReservacion.Estado = this.estado_id;
      this.estadoCambiarReservacion.Motivo = this.motivo;
      this.estadoCambiarReservacion.ReservaId = this.reservaId;
      this.reservacionService.UpdateReservacionEstado(this.estadoCambiarReservacion).subscribe({
        next: response => {
          if (response.respuesta) {
            this.toastr.success(response.message);
            this.buscar();
            this.modalService.dismissAll();
            
          }
          else {
            this.toastr.error(response.message);
          }

        },
        complete: () => {
          this.spinnerService.hide();
        },
        error: (error) => {
          this.spinnerService.hide();
        }
      })
    }

  }

  ZonasMesas() {
    const modalRef = this.modalService.open(MesasZonasComponent, { size: 'xl' });

  }

  Parametros() {
    const modalRef = this.modalService.open(ParametrosComponent, { size: 'lg' });

  }

  cambiarestado(reserva: ReservacionLista) {
    this.estado_id = null;
    this.reservaId = reserva.ReservaId;
    this.motivo="";
    const modalRef = this.modalService.open(this.templateModalConfirmacion, { size: 'xs' });
  }

  detalleReserva(reserva: ReservacionLista) {
    this.detalleReservacion= null;
    this.detalleReservacion = reserva;
    const modalRef = this.modalService.open(this.templateModalData, { size: 'xs' });
  }

  cerrarsesion(){

    localStorage.clear();
    this.router.navigate(['inicio']);
  }
}
