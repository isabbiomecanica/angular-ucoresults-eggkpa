import { Component, OnInit,  Input, Observable } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogConfig} from "@angular/material";


import { Paciente } from '../paciente';
import { Prueba } from '../prueba';

import {DataSource} from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';

// import { HEROES } from '../mock-heroes';

import { PacienteService } from '../paciente.service';
import { ActivatedRoute } from '@angular/router';

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import 'firebase/firestore';

import { ResultadosComponent } from '../resultados/resultados.component';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

  ref: AngularFireStorageReference;
  profileUrl: Observable<string | null>;  

  pacientes: Paciente[];
  prueba: Prueba;
  pruebas: Prueba[];
  pacienteSelect: Paciente;
  pruebasSelect: Prueba[];
  ficheros: string[]=[];

  dataSource: MatTableDataSource<Prueba>;
  displayedColumns = ['description', 'datetime','download', 'view'];
 

  constructor(private pacienteService: PacienteService, private route: ActivatedRoute, private afStorage: AngularFireStorage, public dialog: MatDialog) { }

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

  download(id: number): void {
    //alert("Descargando ficheros de datos");
    console.log(id);
    //this.ref = this.afStorage.ref(id);
    let laURL: string;
    // const id = +this.route.snapshot.paramMap.get('id');
    this.pacienteService.getPrueba(id)
    .subscribe(prueba => this.prueba = prueba);
    const fichero = "/pruebas/"+this.prueba.name+"/"+this.prueba.name+"_"+this.prueba.description+"_"+this.prueba.datetime+"/"+this.prueba.name+"_"+this.prueba.description+"_"+this.prueba.datetime;
    console.log(fichero);

    this.ref = this.afStorage.ref(fichero+".csv");
      this.profileUrl = this.ref.getDownloadURL();
      console.log(this.profileUrl);
      //window.open(this.profileUrl);
      this.profileUrl.subscribe(url=>{
      if(url){
        laURL=url;
        //this.downloadFile(laURL);
        //window.open(laURL, "_self");
        window.location.assign(laURL);
        alert(this.prueba.name+"_"+this.prueba.description+"_"+this.prueba.datetime+".csv");
        //this.ficheros.push(laURL);
         }
      });
    for(let i = 1; i < 4; i++)
    {
      this.ref = this.afStorage.ref(fichero+"_"+i+".csv");
      this.profileUrl = this.ref.getDownloadURL();
      console.log(this.profileUrl);
      //window.open(this.profileUrl);
      this.profileUrl.subscribe(url=>{
      if(url){
        laURL=url;
        //this.downloadFile(laURL);
        //window.open(laURL, "_self");
        window.location.assign(laURL);
        alert(this.prueba.name+"_"+this.prueba.description+"_"+this.prueba.datetime+"_"+i+".csv");
        //this.ficheros.push(laURL);
         }
      });
    }
    console.log(this.ficheros);
  
  }

  downloadFile(filePath: string): void {
    var a = document.createElement('A');
    
    a.href = filePath;
    a.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);


    //var link=document.createElement('a');
    //link.href = filePath;
    //link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    //link.click();
}

  view(id: number) {
      
    
    // '/Resultados/FOR017/FOR017_Prueba%20Cervical_04-03-2020,%2011:13'
    
    this.pacienteService.getPrueba(id)
    .subscribe(prueba => this.prueba = prueba);
    const idcamino = "/Resultados/"+this.prueba.name+"/"+this.prueba.name+"_"+this.prueba.description+"_"+this.prueba.datetime;
    console.log(idcamino);
    
    let laURL: string;
    const idGrafica = "/resultados/"+this.prueba.name+"/"+this.prueba.name+"_"+this.prueba.description+"_"+this.prueba.datetime+"/Result_"+this.prueba.name+"_"+this.prueba.description+"_"+this.prueba.datetime;
    console.log(idGrafica);


    this.ref = this.afStorage.ref(idGrafica);
    this.profileUrl = this.ref.getDownloadURL();
    console.log(this.profileUrl);
    
    this.profileUrl.subscribe(url=>{
      if(url){
        laURL=url;
          const dialogRef = this.dialog.open(ResultadosComponent,{ width:'1200px', disableClose: true, data: { camino: idcamino, caminografica: laURL }});    
         }
      });


    
      
    }

}

