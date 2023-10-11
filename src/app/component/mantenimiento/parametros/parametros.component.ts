import { getTestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Empresa  } from 'src/app/module/Empresa';
import { EmpresaService } from 'src/app/service/empresa/empresa.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  empresa=new Empresa();
  onCreateForm = this.formBuilder.group({
    'Nombre': ['', Validators.compose([
      Validators.required,
    ]),],
    'AtencionDiaInicio': ['', Validators.compose([
      Validators.required,
    ]),],
    'AtencionDiaFin': ['', Validators.compose([
      Validators.required, 
    ])],
    'AtencionHoraInicio': ['', Validators.compose([
      Validators.required,
    ]),],
    'AtencionHoraFin': ['', Validators.compose([
      Validators.required,
    ]),],
    'Telefono': ['', Validators.compose([
      Validators.required,
    ]),],
    'Personas': ['', Validators.compose([
      Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ]),],
  });
  constructor(private spinnerService: NgxSpinnerService, private toastr: ToastrService,
    public activeModal: NgbActiveModal,private formBuilder: FormBuilder,private empresaService:EmpresaService) { }

  ngOnInit(): void {
    this.parametrosbase();
  }

  parametrosbase() {
    this.spinnerService.show();

    this.empresaService.RegistroEmpresa().subscribe({
      next: response => {
        this.empresa = response.data;
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
      this.empresaService.UpdateEmpresa(this.empresa).subscribe({
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
      this.toastr.warning("Verifique los campos Obligatorios(*)");
    }
  }


}
