import { Component, OnInit } from '@angular/core';

import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private pacienteService: PacienteService) { }
 ngOnInit() {
    this.pacienteService.getPacientes();
  }
  

}