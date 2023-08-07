import { Component, OnInit,AfterViewChecked,Input  } from '@angular/core';
import { Empresa } from 'src/app/module/Empresa';
import { GlobalEmpresaService } from 'src/app/service/globalEmpresa/global-empresa.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit,AfterViewChecked {
  empresa = new Empresa;
  constructor(private globalEmpresaService: GlobalEmpresaService) { }
  @Input() empresaData = new Empresa;
  ngOnInit(): void {
    
  }

  ngAfterViewChecked(): void {
    //this.registroEmpresaGlobal();
  }

  // registroEmpresaGlobal() {
  //   setTimeout(()=>{
  //     this.empresa = this.globalEmpresaService.empresaObjeto.value;
  //   },0)
  
  // }
  // probando(){
  //   console.log(this.globalEmpresaService.empresaObjeto.value);
  // }
}
