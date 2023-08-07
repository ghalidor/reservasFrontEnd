import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutclienteComponent } from './component/plantilla/cliente/layoutcliente/layoutcliente.component';
import { LandingComponent } from './component/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: LayoutclienteComponent },
  { path: 'landing', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
