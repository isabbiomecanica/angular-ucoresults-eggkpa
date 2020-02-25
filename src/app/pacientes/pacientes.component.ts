import { Component, OnInit } from '@angular/core';
import { Paciente } from '../paciente';
// import { HEROES } from '../mock-heroes';

import { PacienteService } from '../paciente.service';
import { MessageService } from '../message.service';



@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
  
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[];

  constructor(private pacienteService: PacienteService) { }

  ngOnInit() {
    this.getPacientes();
  }

  getPacientes(): void {
    this.pacienteService.getPacientes()
    .subscribe(pacientes => this.pacientes = pacientes);
  }
}