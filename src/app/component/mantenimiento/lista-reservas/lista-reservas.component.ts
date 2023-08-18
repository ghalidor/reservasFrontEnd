import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import moment from 'moment';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ReservacionService } from 'src/app/service/reservacion/reservacion.service';
import { ReservacionNuevo, Reserva } from 'src/app/module/reservacion';


@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit, OnDestroy {
  images = ['bg-2.jpg', 'bg-2.jpg', 'bg-2.jpg'].map((n) => `assets/img/${n}`);
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  moment = moment;
  fechaini: Date;
  fechafin: Date;
  mostrar: boolean;
  listaReserva: Reserva[];
  constructor(private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private reservacionService: ReservacionService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listaReserva = [];
    this.mostrar = true;
    this.fechaini = new Date();
    this.fechafin = new Date();
    this.dtOptions = {
      destroy: true,
      pagingType: 'first_last_numbers',
      pageLength: 10,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
      // language: {
      //   url: 'assets/es-mx.json'
      // },
      dom:
        "<'row'<'col-12' <'row'<'col-2 col-md-1'l><'col-md-11 col-10'f> >>>" +
        "<'row'<'col-12 mt-2'tr>>" +
        "<'row'<'col-5'i><'col-7'p>>",
      responsive: true,
      processing: true,
      autoWidth: true,
      scrollCollapse: false,
      order: [],
      "columnDefs": [{
        "targets": 3,
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
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }
    this.mostrar = false;
    var fechaini = moment(this.fechaini, "DD-MM-YYYY").format("YYYY-MM-DD");
    var fechafin = moment(this.fechafin, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.reservacionService.GetReservas(fechaini, fechafin).subscribe({
      next: response => {
        
        this.listaReserva = response.data;
        this.dtTrigger.next(0);
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
