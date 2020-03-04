import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { PacienteDetailComponent }  from './paciente-detail/paciente-detail.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'pacientes', component: PacientesComponent },
  //{path: 'detail/:id', component: PacienteDetailComponent },
  {path: 'detail/:id', component: PruebasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouters {}