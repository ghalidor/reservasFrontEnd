import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { zonas } from 'src/app/module/zonas';
import { mesas } from 'src/app/module/mesas';
import { ZonasService } from 'src/app/service/zonas/zonas.service';
import { MesasService } from 'src/app/service/mesas/mesas.service';
import { EmpresaService } from 'src/app/service/empresa/empresa.service';
import { ReservacionService } from 'src/app/service/reservacion/reservacion.service';
import { ReservacionNuevo, ListaHorasZonaMesasLibre } from 'src/app/module/reservacion';
import { Router } from '@angular/router';

import { Empresa, EmpresaAcceso } from 'src/app/module/Empresa';
import { GlobalEmpresaService } from 'src/app/service/globalEmpresa/global-empresa.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-layoutcliente',
  templateUrl: './layoutcliente.component.html',
  styleUrls: ['./layoutcliente.component.css']
})
export class LayoutclienteComponent implements OnInit, AfterViewInit {
  closeResult = '';
  selectedCar: number;
  moment = moment;
  fechaini: Date;
  mostrar: boolean;
  listaHoras: ListaHorasZonaMesasLibre[];
  usuario: string;
  password: string;
  empresaAcceso = new EmpresaAcceso();
  onCreateForm = this.formBuilder.group({
    'usuario': ['', Validators.compose([
      Validators.required,
    ]),],
    'password': ['', Validators.compose([
      Validators.required,
    ]),],
  });

  //listaHoras: string[] = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 AM', '01:00 PM', '02:00 PM'];
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();

  HcantP: number;
  Hfecha: string;
  Hhora: string;
  Hzona: string;

  BcantP: number;
  Bfecha: string;
  Bhora: string;
  Bzona: number;

  BfechaAny: any;

  nombres: string;
  nrodocumento: string;
  telefono: string;
  mensaje: string;
  mascotas: boolean;
  correo: string;
  listaZonas: zonas[];
  listaMesas: mesas[];

  hayhoras: boolean;

  empresa = new Empresa;
  reserva = new ReservacionNuevo;
  @ViewChild('modalReserva') public templateModalmodalReserva: TemplateRef<any>;
  @ViewChild('login') public templateModallogin: TemplateRef<any>;
  weekdays: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  tituloSemana: string;

  daysDisables: number[];
  images = ['bg-2.jpeg', 'bg-2.jpeg', 'bg-2.jpeg'].map((n) => `assets/img/${n}`);
  constructor(
    private modalService: NgbModal,
    private reservacionService: ReservacionService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private mesasService: MesasService,
    private zonasServices: ZonasService,
    private globalEmpresaService: GlobalEmpresaService,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];

    this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit(): void {
    this.listaZonas=[];
    this.hayhoras = true;
    //this.toastr.warning("Seleccione Empresa/Sede");
    this.RegistroEmpresa();
    //this.ListaZonas();
    this.tituloSemana = "";
    this.mostrar = false;
    this.BcantP = 0;
    this.Bfecha = "";
    this.Bhora = "";
    this.Bzona = 0;
    this.bsInlineValue = null;
    this.BfechaAny = null;

    this.nombres = "";
    this.nrodocumento = "";
    this.telefono = "";
    this.mensaje = "";
    this.mascotas = false;

    this.daysDisables = [];
    //  this.registroEmpresaGlobal();
    this.usuario = "";
    this.password = "";


  }

  ngAfterViewInit(): void {
    //this.registroEmpresaGlobal();
  }

  open(modal: TemplateRef<any>) {
    this.RegistroEmpresa();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', size: "xl" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  opensm(modal: TemplateRef<any>) {
    this.RegistroEmpresa();
    this.usuario = "";
    this.password = "";
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', size: "sm" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  avanzar(posicion: string) {
    this.toastr.clear();
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
        step = this.Bfecha != "" ? true : false;
        message = "Seleccione Fecha de la reservación";
        break;
      case 'field_hora':
        step = this.Bhora != "" ? true : false;
        message = "Seleccione Hora de la reservación";

        // var lista = this.listaHoras.filter(z=>z.Hora==this.Bhora);
        // if(lista.length>0){
        //   this.listaZonas=lista[0].ZonasLibres;
        // }

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
    this.toastr.clear();
    const caActual = document.getElementById("ca" + cantidad);
    const bloqueado = caActual.className.includes("bloqueo") ? true : false;
    if (!bloqueado) {
      const padre = caActual.parentElement.parentElement;
      const hijos = padre.querySelectorAll("a");
      hijos.forEach(x => x.classList.remove("orange"));
      caActual.classList.add("orange");
      this.BcantP = cantidad;
      this.HcantP = cantidad;
    }
    else {
      this.toastr.warning("Cantidad no permitida");
    }
    console.log(this.daysDisables)
  }

  onDateSelect(event) {
    this.BfechaAny = moment(event).format("DD-MM-YYYY");
    this.Hfecha = this.BfechaAny;
    this.Bfecha = moment(this.BfechaAny, "DD-MM-YYYY").format("YYYY-MM-DD");
    this.listarHoraZonasLibres();
    //console.log(event)
  }

  horaReserva(hora: string, indice: number) {

    var fecha = moment().format("YYYY-MM-DD");

    const hora_actual = document.getElementsByClassName("hora_" + indice);
    if (hora_actual[0].classList.contains("bloqueo")) {
      this.toastr.warning("No hay Zonas Libres a las " + moment(fecha + " " + hora, "YYYY-MM-DD HH:mm A").format("HH:mm A"));
    }
    else {
      this.Bhora = moment(fecha + " " + hora, "YYYY-MM-DD HH:mm A").format("HH:mm A");
      this.Hhora = hora_actual[0].textContent;
      const padre = hora_actual[0].parentElement.parentElement;
      const hijos = padre.querySelectorAll("a");
      hijos.forEach(x => x.classList.remove("orange"));
      hora_actual[0].classList.add("orange");

      this.listaZonas.forEach(obj => {
        var existe = this.listaHoras.find(x => x.Hora == this.Bhora && x.ZonasLibres.find(y => y.EsActivo == false && y.ZonaId == obj.ZonaId));
        //var existe = idMesa.ZonasLibres.find(x => x.ZonaId == obj.ZonaId);
        if (existe) {
          obj.EsActivo = false;
          if (this.Bzona == obj.ZonaId) {
            this.Bzona = 0;
            this.Hzona = null;
            console.log("zona_" + obj.ZonaId)
            const zona_actual = document.getElementById("zona_" + obj.ZonaId);
            zona_actual.classList.remove("bloqueo");
            zona_actual.classList.remove("orange");
          }
        }
        else {
          obj.EsActivo = true;
        }
      })
    }

  }

  zonaReserva(id: number, estado: boolean) {
    if (estado) {
      const zona_actual = document.getElementById("zona_" + id);
      const padre = zona_actual.parentElement.parentElement;
      const hijos = padre.querySelectorAll("a");
      hijos.forEach(x => x.classList.remove("orange"));
      zona_actual.classList.add("orange");
      this.Bzona = id;
      this.Hzona = zona_actual.textContent;
    }
    else {
      this.toastr.warning("Zona sin mesas Libres");
    }
    //console.log(this.Hzona)
  }

  formulario(posicion: number) {
    console.log(this.mascotas)
    if (this.nombres != "" && this.nrodocumento != "" && this.telefono != "" && this.mascotas != null && this.correo != null) {
      this.mostrar = true;
    }
    else {
      console.log("aqui")
      this.mostrar = false;
    }
  }

  registrarReserva() {
    if (this.mostrar) {
      this.spinnerService.show();
      this.reserva.Personas = this.BcantP;
      this.reserva.Fecha = this.Bfecha;
      this.reserva.Hora = this.Bhora;
      this.reserva.ZonaId = this.Bzona;
      this.reserva.Nrodocumento = this.nrodocumento;
      this.reserva.Nombre = this.nombres;
      this.reserva.Telefono = this.telefono;
      this.reserva.Mensaje = this.mensaje;
      this.reserva.Mascotas = this.mascotas;
      this.reserva.Correo = this.correo;
      this.reservacionService.CreateReservacionSinZona(this.reserva).subscribe({
        next: response => {
          if (response.respuesta) {
            this.toastr.success(response.message);
            //this.router.navigate(['inicio']);
            setTimeout(() => {
              document.location.reload();
            }, 1000);

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
    else {
      this.toastr.warning("Complete los campos Obligatorios(*)");
    }
  }

  ListaZonas() {
    this.spinnerService.show();
    this.zonasServices.listaZonas().subscribe({
      next: response => {
        this.listaZonas = response.data;
        if (this.listaZonas.length > 0) {
          this.listaZonas = this.listaZonas.filter(z => z.EsActivo);
        }
      },
      complete: () => {

      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  ListaMesas() {
    this.spinnerService.show();

    this.mesasService.listaMesas().subscribe({
      next: response => {
        this.listaMesas = response.data;
      },
      complete: () => {

      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  listarHoraZonasLibres() {
    this.spinnerService.show();
    this.reservacionService.GetReservaHora().subscribe({
      next: response => {
        this.listaHoras = response.data.lista;
        this.Hzona = null;
        this.Bzona = 0;
        this.Hhora = null;
        this.Bhora = "";
        // const fielzona = document.getElementById("field_zona");
        // const hijos = fielzona.querySelectorAll("a");
        // hijos.forEach(x => x.classList.remove("orange"));

        this.hayhoras = this.listaHoras.filter(x => x.IsActivo).length > 0 ? true : false;
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  registroEmpresaGlobal() {
    setTimeout(() => {
      var fecha = moment().format("YYYY-MM-DD");
      this.empresa = this.globalEmpresaService.empresaObjeto.value;
      this.empresa.AtencionHoraInicio = moment(fecha + " " + this.empresa.AtencionHoraInicio, "YYYY-MM-DD HH:mm a").format("hh:mm a");
      this.empresa.AtencionHoraFin = moment(fecha + " " + this.empresa.AtencionHoraFin, "YYYY-MM-DD HH:mm a").format("hh:mm a");
      this.tituloSemana = this.weekdays[this.empresa.AtencionDiaInicio] + " - " + this.weekdays[this.empresa.AtencionDiaFin];
      const permisoCantidadPersonas = document.getElementById("listaCantidad");
      const links = permisoCantidadPersonas.querySelectorAll("a");
      links.forEach(x => Number(x.textContent) > this.empresa.Personas && x.classList.add("bloqueo"));

      for (let i = 0; i < 7; i++) {
        if (i >= this.empresa.AtencionDiaInicio && i <= this.empresa.AtencionDiaFin) {
        }
        else {
          this.daysDisables.push(i);
        }
      }
    }, 0);
  }



  RegistroEmpresa() {
    this.empresaService.RegistroEmpresa().subscribe({
      next: response => {
        this.empresa = response.data;
        var fecha = moment().format("YYYY-MM-DD");
        this.empresa.AtencionHoraInicio = moment(fecha + " " + this.empresa.AtencionHoraInicio, "YYYY-MM-DD HH:mm a").format("hh:mm a");
        this.empresa.AtencionHoraFin = moment(fecha + " " + this.empresa.AtencionHoraFin, "YYYY-MM-DD HH:mm a").format("hh:mm a");
        this.tituloSemana = this.weekdays[this.empresa.AtencionDiaInicio] + " - " + this.weekdays[this.empresa.AtencionDiaFin];
        const permisoCantidadPersonas = document.getElementById("listaCantidad");
        if (permisoCantidadPersonas != null) {
          const that = this;
          const links = permisoCantidadPersonas.querySelectorAll("a");
          var i = 0;
          links.forEach(function (x) {
            i++;
            if (Number(x.textContent) > that.empresa.Personas) {
              x.parentElement.classList.add("ocultoplus");
              x.classList.add("bloqueo");
            }
            else {
              x.parentElement.classList.add("actuales");
              if (i > 4) {
                x.parentElement.classList.add("plushide");
              }
            }

          });

          if(i>4){
            const caplus = document.getElementById("caplus");
            caplus.parentElement.classList.remove("plushide");
          }

          //links.forEach(x => Number(x.textContent) > this.empresa.Personas && x.classList.add("bloqueo"));

          for (let i = 0; i < 7; i++) {
            if (i >= this.empresa.AtencionDiaInicio && i <= this.empresa.AtencionDiaFin) {
            }
            else {
              this.daysDisables.push(i);
            }
          }
        }

      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        console.log(error);
        this.spinnerService.hide();
      }
    })
  }

  validar() {
    if (this.onCreateForm.valid) {
      this.spinnerService.show();
      this.empresaAcceso.Usuario = this.usuario;
      this.empresaAcceso.Password = this.password;
      this.empresaService.Login(this.empresaAcceso).subscribe({
        next: response => {
          if (response.respuesta) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('isLoggedIn', 'true');
            this.toastr.success(response.message);
            this.router.navigate(['reservas']);


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
    else {
      this.toastr.warning("Complete los campos Obligatorios(*)");
    }
  }


  mostrarPLus() {
    const permisoCantidadPersonas = document.getElementById("listaCantidad");
    const caplus = document.getElementById("caplus");
    const that = this;
    const links = permisoCantidadPersonas.querySelectorAll("div.plushide");
    links.forEach(function (x) {
      x.classList.remove("plushide");

    });
    caplus.style.display = "none";
  }

}
