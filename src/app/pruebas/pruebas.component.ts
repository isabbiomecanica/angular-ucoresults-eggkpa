import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Paciente } from '../paciente';
import { Prueba } from '../prueba';

import {DataSource} from '@angular/cdk/table';

// import { HEROES } from '../mock-heroes';

import { PacienteService } from '../paciente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

pacientes: Paciente[];
pruebas: Prueba[];
pacienteSelect: Paciente;
pruebasSelect: Prueba[];



 displayedColumns = ['id', 'name', 'date', 'description'];
 dataSource = new PostDataSource(this.pacienteService);

  constructor(private pacienteService: PacienteService, private route: ActivatedRoute) { }

 ngOnInit() {
    this.getPacientes();
    this.getPruebas();
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("Prueba Seleccionada");
    console.log(id);
    this.pacienteSelect  = <Paciente>this.pacientes.filter(paciente => paciente.id == id);
    console.log(this.pacienteSelect[0].name);
    this.pruebasSelect = this.pruebas.filter(prueba => prueba.name === this.pacienteSelect[0].name);
    console.log(this.pruebasSelect);
  }

  getPacientes(): void {
    this.pacienteService.getPacientes()
    .subscribe(pacientes => this.pacientes = pacientes);
  }
  
  getPruebas(): void {
    this.pacienteService.getPruebas()
    .subscribe(pruebas => this.pruebas = pruebas);
    console.log("Total pruebas");
    console.log(this.pruebas.length);
  }
  

}

export class PostDataSource extends DataSource<any> {
  constructor(private pacienteService: PacienteService) {
    super();
  }

  connect(): Observable<Prueba[]> {
    return this.pruebasSelect;
  }

  disconnect() {
  }
}
