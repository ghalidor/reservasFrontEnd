import { Component, OnInit ,Input,OnDestroy,} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MesasService } from 'src/app/service/mesas/mesas.service';
import { mesas } from 'src/app/module/mesas';
import { zonas } from 'src/app/module/zonas';
import { ZonasService } from 'src/app/service/zonas/zonas.service';
import { MesasZonasComponent } from '../mesas-zonas/mesas-zonas.component';

@Component({
  selector: 'app-mesas-editar',
  templateUrl: './mesas-editar.component.html',
  styleUrls: ['./mesas-editar.component.css']
})
export class MesasEditarComponent implements OnInit ,OnDestroy{
  mesas=new mesas();
  @Input() zonaId;
  @Input() mesaId;
  @Input() mesanombre;
  listaZonas: zonas[];
  onCreateForm = this.formBuilder.group({
    'Descripcion': ['', Validators.compose([
      Validators.required,
    ]),],
    'ZonaId': ['', Validators.compose([
      Validators.required,
    ]),],
    'NumeroMesa': ['', Validators.compose([
      Validators.required, 
    ])],
    'ParaReservar': ['', Validators.compose([
      Validators.required,
    ]),],
    'Pax': ['', Validators.compose([
      Validators.required,
    ]),],
  });
  constructor(private spinnerService: NgxSpinnerService, private toastr: ToastrService,    
    private zonasServices: ZonasService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private mesasService:MesasService) { }

  ngOnInit(): void {
   
    if(this.mesaId>0){
      this.detalle(this.mesaId);
    }
    else{
      this.mesas.MesaId=0
      this.mesas.ZonaId=this.zonaId; 
    }
   this.ListaZonas(); 
  }

  ngOnDestroy(): void {
    const modalRef_ = this.modalService.open(MesasZonasComponent, { size: 'xl' });
  }

  ListaZonas() {
    //this.spinnerService.show();
    this.zonasServices.listaZonas().subscribe({
      next: response => {
        this.listaZonas = response.data;
      },
      complete: () => {

      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }


  detalle(id:number) {
    this.spinnerService.show();

    this.mesasService.GetMesaID(id).subscribe({
      next: response => {
        this.mesas = response.data;
       
      },
      complete: () => {
        this.spinnerService.hide();
      },
      error: (error) => {
        this.spinnerService.hide();
      }
    })
  }

  guardar() {
    if (this.onCreateForm.valid) {
      this.mesas.Tipo="_";
      if(this.mesas.MesaId==0){
        this.mesasService.CreateMesa(this.mesas).subscribe({
          next: response => {
           if(response.respuesta){
            this.toastr.success(response.message);
            this.activeModal.dismiss();
           }
           else{
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
      else{
        this.mesasService.UpdateMesa(this.mesas).subscribe({
          next: response => {
           if(response.respuesta){
            this.toastr.success(response.message);
            this.activeModal.dismiss();
           }
           else{
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
    else{
      this.toastr.warning("Verifique los campos Obligatorios(*)");
    }
  }
}
