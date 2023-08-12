import { Component, OnInit,Input } from '@angular/core';
import { Empresa } from 'src/app/module/Empresa';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() empresaData = new Empresa;
  constructor() { }

  ngOnInit(): void {
  }

}
