import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { zonas } from 'src/app/module/zonas';
import { mesas } from 'src/app/module/mesas';
import { ZonasService } from 'src/app/service/zonas/zonas.service';
import { MesasService } from 'src/app/service/mesas/mesas.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MesasEditarComponent } from '../mesas-editar/mesas-editar.component';
import { ZonasEditarComponent } from '../zonas-editar/zonas-editar.component';
@Component({
  selector: 'app-mesas-zonas',
  templateUrl: './mesas-zonas.component.html',
  styleUrls: ['./mesas-zonas.component.css']
})
export class MesasZonasComponent implements OnInit {
  listaZonas: zonas[];
  listaMesas: mesas[];
  zonaid: number;
  zonanombre: String;
  constructor(private spinnerService: NgxSpinnerService, private toastr: ToastrService, private mesasService: MesasService,
    private zonasServices: ZonasService, private modalService: NgbModal,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.ListaZonas();
    this.zonaid = null;
  }
  ListaZonas() {
    this.spinnerService.show();
    this.zonasServices.listaZonas().subscribe({
      next: response => {
        this.listaZonas = response.data;

      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  zonaSeleccion(id: number, nombre: String) {
    this.toastr.clear();
    const caActual = document.getElementById("zona" + id);
    const padre = document.getElementById("progressbar");
    const hijos = padre.querySelectorAll("li");
    hijos.forEach(x => x.classList.remove("active"));
    caActual.classList.add("active");
    this.zonaid = id;
    this.zonanombre = nombre;
    this.ListaMesas(id);
  }

  ListaMesas(id: number) {
    this.spinnerService.show();

    this.mesasService.ListaMesasxZona(id).subscribe({
      next: response => {
        this.listaMesas = response.data;
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  zonaEditar() {

    if (this.zonaid > 0) {
      this.modalService.dismissAll();
      const modalRef = this.modalService.open(ZonasEditarComponent, { size: 'md' });
      modalRef.componentInstance.zonanombre = this.zonanombre;
      modalRef.componentInstance.zonaId = this.zonaid;
    }
    else {
      this.toastr.warning("Seleccione Zona");
    }
  }

  zonaCrear() {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ZonasEditarComponent, { size: 'md' });
    modalRef.componentInstance.zonanombre = "";
    modalRef.componentInstance.zonaId = 0;
  }

  mesaEditar(zonaid: number, posicion: number, mesanombre: String) {
    if (this.zonaid > 0) {
      this.modalService.dismissAll();
      const modalRef = this.modalService.open(MesasEditarComponent, { size: 'md' });
      modalRef.componentInstance.zonaId = zonaid;
      modalRef.componentInstance.mesaId = posicion;
      modalRef.componentInstance.mesanombre = mesanombre;
    }
    else {
      this.toastr.warning("Seleccione Zona");
    }

  }

}
