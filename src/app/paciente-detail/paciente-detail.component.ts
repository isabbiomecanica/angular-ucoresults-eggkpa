import { Component, OnInit, Input, Observable } from '@angular/core';

import { Paciente } from '../paciente';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PacienteService }  from '../paciente.service';
import { UTPatient } from '../clases/UTPatient.ts'

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';



import 'firebase/firestore';

@Component({
  selector: 'app-paciente-detail',
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css'],
  // providers: [ PacienteService ]
  
})
export class PacienteDetailComponent implements OnInit {

  @Input() paciente: Paciente;
  @Input() elPaciente: UTPatient;
  ref: AngularFireStorageReference;
  profileUrl: Observable<string | null>;
  
  
 constructor(private afStorage: AngularFireStorage,
  private route: ActivatedRoute,
  private pacienteService: PacienteService,
  private location: Location
) {}

ngOnInit(): void {
  this.getPaciente();
}
getPaciente(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  console.log('Paciente');
  console.log(id);
  console.log(this.pacienteService.Dato.length);
  this.pacienteService.getPaciente(id)
    .subscribe(paciente => this.paciente = paciente);
    console.log(this.paciente);
}

goBack(): void {
  this.location.back();
}

download(): void {
  //this.ref = this.afStorage.ref(id);
  let laURL: string;
  const id = +this.route.snapshot.paramMap.get('id');
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

  // window.navigator.msSaveBlob()

}



}