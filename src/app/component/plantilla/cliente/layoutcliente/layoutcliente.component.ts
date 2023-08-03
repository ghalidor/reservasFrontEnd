import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Zonas } from 'src/app/module/zonas';
import { Mesas } from 'src/app/module/mesas';

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

  cantPersonas: number;
  dfecha: string;
  dhora: string;
  dzona: string;

  listaZonas: Zonas[];
  listaMesas: Mesas[];

  constructor(private toastr: ToastrService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit(): void {
    this.toastr.warning("Seleccione Empresa/Sede");
  }

  avanzar(posicion: string) {
    const box = document.getElementById(posicion);
    box.classList.add("active");
    const fieldset = document.getElementById("field_" + posicion);
    fieldset.style.display = 'block';
    const fieldsetAnterior = document.getElementById(fieldset.previousElementSibling.id);
    fieldsetAnterior.style.display = 'none';
    console.log(fieldset.previousElementSibling.id);
  }

  retroceder(posicion: string) {
    const liActual = document.getElementById(posicion);
    liActual.classList.remove("active");

    const fieldsetActual = document.getElementById("field_" + posicion);
    fieldsetActual.style.display = 'none';

    const fieldsetAnterior = document.getElementById(fieldsetActual.previousElementSibling.id);
    fieldsetAnterior.style.display = 'block';

  }

}
