import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Paciente } from '../paciente';
import { Prueba } from '../prueba';

import {DataSource} from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';

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

  dataSource: MatTableDataSource<Prueba>;
  displayedColumns = ['description', 'datetime','download', 'view'];
 

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
    
    this.dataSource = new MatTableDataSource(this.pruebasSelect);
    console.log(this.dataSource);
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
  

  goBack(): void {
  this.location.back();
}

  download(id): void {
    
    //this.ref = this.afStorage.ref(id);
    let laURL: string;
    // const id = +this.route.snapshot.paramMap.get('id');
    this.pacienteService.getPaciente(id)
    .subscribe(paciente => this.paciente = paciente);
    const fichero = "/usuarios/"+this.paciente.name+"/"+this.paciente.name+".json"
    console.log(fichero);
    this.ref = this.afStorage.ref(fichero);
    this.profileUrl = this.ref.getDownloadURL();
    console.log(this.profileUrl)
    this.profileUrl.subscribe(url=>{
     if(url){
         console.log("entro");
         laURL=url;
         console.log(laURL);
         // descarga(laURL,this.paciente.name+".json");
         // window.open(laURL);
         // const elPaciente: UTPatient = this.pacienteService.getUTPatient(laURL);
         console.log("Llamo");
         this.pacienteService.getUTPatient(laURL).subscribe(UTPatient => this.elPaciente = UTPatient);
         console.log(this.elPaciente);
        }
         
         
        

     });

  
  }
  view(id) {
    
      alert('Ver!');
    }

}

