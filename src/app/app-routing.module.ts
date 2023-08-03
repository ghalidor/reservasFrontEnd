import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutclienteComponent } from './component/plantilla/cliente/layoutcliente/layoutcliente.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: LayoutclienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
