import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutclienteComponent } from './component/plantilla/cliente/layoutcliente/layoutcliente.component';
import { LandingComponent } from './component/landing/landing.component';
import { ListaReservasComponent } from './component/mantenimiento/lista-reservas/lista-reservas.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: LayoutclienteComponent},
  { path: 'landing', component: LandingComponent,canActivate : [AuthGuardGuard]  },
  { path: 'reservas', component: ListaReservasComponent,canActivate : [AuthGuardGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
