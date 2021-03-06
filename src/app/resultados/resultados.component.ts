import { Component, Inject, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';


import { Resultado } from '../resultado';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import 'firebase/firestore';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

/*
   profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  */

  oresultado: AngularFireObject<any>;
  resultado: Resultado;
  resultado_U: Resultado;
  
  ref: AngularFireStorageReference;
  eval: Array <String>=[];
  FLEX_F = new FormControl('');
  FLEX_E = new FormControl('');
  FLEX = new FormControl('');
  ROT_L = new FormControl('');
  ROT_R = new FormControl('');
  ROT = new FormControl('');
  LAT_L = new FormControl('');
  LAT_R = new FormControl('');
  LAT = new FormControl('');
  U_FLEX_F = new FormControl('');
  U_FLEX_E = new FormControl('');
  U_FLEX = new FormControl('');
  U_ROT_L = new FormControl('');
  U_ROT_R = new FormControl('');
  U_ROT = new FormControl('');
  U_LAT_L = new FormControl('');
  U_LAT_R = new FormControl('');
  U_LAT = new FormControl('');

  camino: string;
  camino_U: string;
  camino_L: string;
  caminografica: string;

  constructor(public afd: AngularFireDatabase, @Inject(MAT_DIALOG_DATA) data) {
  // this.resultado = new Resultado();  
  
   

        this.camino = data.camino;
        this.caminografica = data.caminografica;
    
  
  this.eval.push('Buena');
  this.eval.push('Regular');
  this.eval.push('Mala');
  console.log(this.camino);
  //this.oresultado = afd.object('/Resultados/FOR017/FOR017_Prueba Cervical_04-03-2020, 11:13').valueChanges().subscribe(data => {
  this.oresultado = afd.object(this.camino).valueChanges().subscribe(data => {
      console.log(data);
      this.resultado = <resultado>data; 
      this.FLEX_F.setValue(this.resultado.maxRoll.toFixed(2));
      this.FLEX_E.setValue(this.resultado.minRoll.toFixed(2));
      this.FLEX.setValue(this.resultado.maxRoll.toFixed(2)-this.resultado.minRoll.toFixed(2));
      this.ROT_L.setValue(this.resultado.maxYaw.toFixed(2));
      this.ROT_R.setValue(this.resultado.minYaw.toFixed(2));
      this.ROT.setValue(this.resultado.maxYaw.toFixed(2)-this.resultado.minYaw.toFixed(2));
      this.LAT_L.setValue(this.resultado.maxPitch.toFixed(2));
      this.LAT_R.setValue(this.resultado.minPitch.toFixed(2));
      this.LAT.setValue(this.resultado.maxPitch.toFixed(2)-this.resultado.minPitch.toFixed(2));
      console.log(this.resultado.patientName);});
  //this.resultado = afd.collection('/Resultados/FOR017/FOR017_Prueba%20Cervical_04-03-2020,%2011:13').valueChanges();
     
      this.camino_U = this.camino+"/Sensor 0";
      this.oresultado = afd.object(this.camino_U).valueChanges().subscribe(data => {
     // Ojo, pueden estar invertidos
      console.log(data);
      this.resultado_U = <resultado>data; 
      this.U_FLEX_F.setValue(this.resultado_U.maxRoll.toFixed(2));
      this.U_FLEX_E.setValue(this.resultado_U.minRoll.toFixed(2));
      this.U_FLEX.setValue(this.resultado_U.maxRoll.toFixed(2)-this.resultado_U.minRoll.toFixed(2));
      this.U_ROT_L.setValue(this.resultado_U.maxYaw.toFixed(2));
      this.U_ROT_R.setValue(this.resultado_U.minYaw.toFixed(2));
      this.U_ROT.setValue(this.resultado_U.maxYaw.toFixed(2)-this.resultado_U.minYaw.toFixed(2));
      this.U_LAT_L.setValue(this.resultado_U.maxPitch.toFixed(2));
      this.U_LAT_R.setValue(this.resultado_U.minPitch.toFixed(2));
      this.U_LAT.setValue(this.resultado_U.maxPitch.toFixed(2)-this.resultado_U.minPitch.toFixed(2));
      console.log(this.resultado_U.patientName);});

      
  //this.resultado = afd.collection('/Resultados/FOR017/FOR017_Prueba%20Cervical_04-03-2020,%2011:13').valueChanges();
     }
  
  ngOnInit() {
  }

onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}
}
