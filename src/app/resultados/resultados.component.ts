import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';


import { Resultado } from '../resultado';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import 'firebase/firestore';



@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

   profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  
  oresultado: AngularFireObject<any>;
  resultado: Resultado;
  ref: AngularFireStorageReference;
  eval: Array <String>=[];
  flexion = new FormControl('');
  extension = new FormControl('');

  constructor(public afd: AngularFireDatabase) {
  // this.resultado = new Resultado();  

  
  this.eval.push('Buena');
  this.eval.push('Buena');
  this.eval.push('Buena');
  
  this.oresultado = afd.object('/Resultados/FOR017/FOR017_Prueba Cervical_04-03-2020, 11:13').valueChanges().subscribe(data => {
      console.log(data);
      this.resultado = <resultado>data; 
      this.flexion.setValue(this.resultado.maxPitch.toFixed(2));
      this.extension.setValue(this.resultado.maxRoll.toFixed(2));
      console.log(this.resultado.patientName);});
  //this.resultado = afd.collection('/Resultados/FOR017/FOR017_Prueba%20Cervical_04-03-2020,%2011:13').valueChanges();
  

   }

  ngOnInit() {
  }

onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}
}
