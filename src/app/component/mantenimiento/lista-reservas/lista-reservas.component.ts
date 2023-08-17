import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit {
  images = ['bg-2.jpg', 'bg-2.jpg', 'bg-2.jpg'].map((n) => `assets/img/${n}`);
  constructor() { }

  ngOnInit(): void {
  }

}
