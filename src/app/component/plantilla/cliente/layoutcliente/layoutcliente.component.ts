import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { Zonas } from 'src/app/module/zonas';
import { Mesas } from 'src/app/module/mesas';
import { ZonasService } from 'src/app/service/zonas/zonas.service';
import { MesasService } from 'src/app/service/mesas/mesas.service';

@Component({
  selector: 'app-layoutcliente',
  templateUrl: './layoutcliente.component.html',
  styleUrls: ['./layoutcliente.component.css']
})
export class LayoutclienteComponent implements OnInit {
  selectedCar: number;
  moment = moment;
  fechaini: Date;
  listaHoras: string[] = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 AM', '01:00 PM', '02:00 PM'];
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();

  HcantP: number;
  Hfecha: string;
  Hhora: string;
  Hzona: string;

  BcantP: number;
  Bfecha: string;
  Bhora: string;
  Bzona: number;

  BfechaAny: any;

  nombres:string;
  nrodocumento:string;
  telefono:string;
  mensaje:string;
  
  listaZonas: Zonas[];
  listaMesas: Mesas[];

  constructor(private toastr: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private mesasService: MesasService,
    private zonasServices: ZonasService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit(): void {
    this.toastr.warning("Seleccione Empresa/Sede");
    this.ListaZonas();
    this.BcantP = 0;
    this.Bfecha = "";
    this.Bhora = "";
    this.Bzona = 0;
    this.bsInlineValue = null;
    this.BfechaAny = null;
  }

  avanzar(posicion: string) {
    const box = document.getElementById(posicion);
    const fieldset = document.getElementById("field_" + posicion);
    const fieldsetAnterior = document.getElementById(fieldset.previousElementSibling.id);
    var step = false;
    var message = "";
    switch (fieldsetAnterior.id) {
      case 'field_personas':
        step = this.BcantP > 0 ? true : false;
        message = "Seleccione Cantidad de Personas";
        break;
      case 'field_calendar':
        if (this.BfechaAny != null) {
          this.Bfecha = moment(this.BfechaAny, "DD-MM-YYYY").format("YYYY-MM-DD");
        }

        step = this.Bfecha != "" ? true : false;
        message = "Seleccione Fecha para la reservación";
        break;
      case 'field_hora':
        step = this.Bhora != "" ? true : false;
        message = "Seleccione Hora de la reservación";
        break;
      case 'field_zona':
        step = this.Bzona != 0 ? true : false;
        message = "Seleccione Zona para la reservación";
        break;
      case 'field_confirm':
        message = "Complete los campos obligatorios";
        step = this.Bzona != 0 ? true : false;
        break;
    }

    if (step) {
      box.classList.add("active");
      fieldset.style.display = 'block';
      fieldsetAnterior.style.display = 'none';
    }
    else {
      this.toastr.warning(message);
    }
  }

  retroceder(posicion: string) {
    const liActual = document.getElementById(posicion);
    liActual.classList.remove("active");

    const fieldsetActual = document.getElementById("field_" + posicion);
    fieldsetActual.style.display = 'none';

    const fieldsetAnterior = document.getElementById(fieldsetActual.previousElementSibling.id);
    fieldsetAnterior.style.display = 'block';

  }

  cantidadPersonas(cantidad: number) {
    const caActual = document.getElementById("ca" + cantidad);
    const padre = caActual.parentElement.parentElement;
    const hijos = padre.querySelectorAll("a");
    hijos.forEach(x => x.classList.remove("orange"));
    caActual.classList.add("orange");
    this.BcantP = cantidad;
  }

  onDateSelect(event) {
    this.BfechaAny = moment(event).format("DD-MM-YYYY");
    this.Hfecha=this.BfechaAny;
    //console.log(event)
  }

  horaReserva(hora:string,indice:number){
    var fecha = moment().format("YYYY-MM-DD");
    this.Bhora = moment(fecha+" "+hora,"YYYY-MM-DD hh:mm a").format("HH:mm a");
    const hora_actual = document.getElementsByClassName("hora_" + indice);
    this.Hhora=hora_actual[0].textContent;
    const padre = hora_actual[0].parentElement.parentElement;
    const hijos = padre.querySelectorAll("a");
    hijos.forEach(x => x.classList.remove("orange"));
    hora_actual[0].classList.add("orange");
    console.log(this.Bhora)
  }

  zonaReserva(id:number,estado:boolean){
    if(estado){
      const zona_actual = document.getElementById("zona_" + id);
      const padre = zona_actual.parentElement.parentElement;
      const hijos = padre.querySelectorAll("a");
      hijos.forEach(x => x.classList.remove("orange"));
      zona_actual.classList.add("orange");
      this.Bzona=id;
      this.Hzona=zona_actual.textContent;
    }
    else{
      this.toastr.warning("Zona sin espacio para reservación");
    }
    console.log(this.Hzona)
  }

  registrarReserva(){
    
  }

  ListaZonas() {
    this.SpinnerService.show();

    this.zonasServices.listaZonas().subscribe({
      next: response => {
        this.listaZonas = response.data;
      },
      complete: () => {

      },
      error: (error) => {
        this.SpinnerService.hide();
      }
    })
  }

  ListaMesas() {
    this.SpinnerService.show();

    this.mesasService.listaMesas().subscribe({
      next: response => {
        this.listaMesas = response.data;
      },
      complete: () => {

      },
      error: (error) => {
        this.SpinnerService.hide();
      }
    })
  }

}
