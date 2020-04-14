import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { APP_BASE_HREF } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';

import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { MessagesComponent } from './messages/messages.component';
// import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteDetailComponent } from './paciente-detail/paciente-detail.component';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { ReactiveFormsModule } from '@angular/forms';

import {AppRouters} from './app.routes';
import {WelcomeComponent} from './welcome/welcome.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {DataService} from './data/data.service';
import {PostDialogComponent} from './post-dialog/post-dialog.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ResultadosComponent } from './resultados/resultados.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule,  MaterialModule, // AppRoutingModule,
                  FlexLayoutModule,AppRouters,FormsModule, HttpClientModule, HttpClientJsonpModule,
                  AngularFireModule.initializeApp(environment.firebase),ReactiveFormsModule,
                  AngularFireDatabaseModule, AngularFireStorageModule, MatPaginatorModule, MatSortModule ],
  declarations: [ AppComponent, HelloComponent, PacientesComponent, PruebasComponent, 
                  PacienteDetailComponent, MessagesComponent, DashboardPacienteComponent, WelcomeComponent, PostDialogComponent, DashboardComponent],
  providers: [DataService],
  entryComponents: [ PostDialogComponent, ResultadosComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
