import { Component, OnInit } from '@angular/core';

import { PacienteService } from '../paciente.service';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {

  
  displayedColumns = ['ID', 'Code'];
  data: UserData[] = [];
  dataSource: MatTableDataSource<UserData>;


  constructor(private pacienteService: PacienteService) { 
    this.data.push({ ID: 1, Code: "Hi" });
    this.data.push({ ID: 2, Code: "Hello" });

    this.dataSource = new MatTableDataSource(this.data);
  }
 ngOnInit() {
    this.pacienteService.getPacientes();
    this.pacienteService.getPruebas();
    
    
    console.log(this.dataSource);
  }
  

}

export interface UserData {
    ID: number;
    Code: string;
  }
