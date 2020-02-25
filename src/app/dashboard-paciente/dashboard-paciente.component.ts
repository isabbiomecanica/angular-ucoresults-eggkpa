import { Component, OnInit } from '@angular/core';
import { Paciente } from '../paciente';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-dashboard-paciente',
  templateUrl: './dashboard-paciente.component.html',
  styleUrls: [ './dashboard-paciente.component.css' ]
})
export class DashboardPacienteComponent implements OnInit {
  pacientes: Paciente[] = [];

  constructor(private pacienteService: PacienteService) { }

  ngOnInit() {
    this.getPacientes();
  }

  getPacientes(): void {
    this.pacienteService.getPacientes()
      .subscribe(pacientes => this.pacientes = pacientes.slice(1, 5));
  }
}