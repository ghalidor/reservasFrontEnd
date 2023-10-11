import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ZonasService } from 'src/app/service/zonas/zonas.service';
import { zonas } from 'src/app/module/zonas';
import { MesasZonasComponent } from '../mesas-zonas/mesas-zonas.component';

@Component({
  selector: 'app-zonas-editar',
  templateUrl: './zonas-editar.component.html',
  styleUrls: ['./zonas-editar.component.css']
})
export class ZonasEditarComponent implements OnInit,OnDestroy {
  zonas = new zonas();
  @Input() zonaId;
  @Input() zonanombre;
  onCreateForm = this.formBuilder.group({
    'Descripcion': ['', Validators.compose([
      Validators.required,
    ]),],

  });
  constructor(private spinnerService: NgxSpinnerService, 
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
     private formBuilder: FormBuilder,
     private zonasService: ZonasService) { }

  ngOnInit(): void {
    this.zonas = new zonas();
    if(this.zonaId>0){
      this.detalle(this.zonaId);
    }
   else{
    this.zonas.ZonaId=0;
   }
  }

  ngOnDestroy(): void {
    const modalRef_ = this.modalService.open(MesasZonasComponent, { size: 'xl' });
  }

  detalle(id: number) {
    this.spinnerService.show();

    this.zonasService.GetZOnaID(id).subscribe({
      next: response => {
        this.zonas = response.data;
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

      console.log(this.zonas)
      if (this.zonas.ZonaId == 0) {
        this.zonasService.CreateZona(this.zonas).subscribe({
          next: response => {
            if (response.respuesta) {
              this.toastr.success(response.message);
              this.activeModal.dismiss();
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
        this.zonasService.UpdateZona(this.zonas).subscribe({
          next: response => {
            if (response.respuesta) {
              this.toastr.success(response.message);
              this.activeModal.dismiss();
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
    else {
      this.toastr.warning("Verifique los campos Obligatorios(*)");
    }
  }
}
