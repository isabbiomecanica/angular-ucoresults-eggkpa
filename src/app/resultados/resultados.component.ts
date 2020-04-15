import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  resultado: Resultado;
  ref: AngularFireStorageReference;

  name = new FormControl('');
  constructor(public afd: AngularFireDatabase) {
  this.resultado = afd.object('/Resultados/FOR017/FOR017_Prueba%20Cervical_04-03-2020,%2011:13').query;
  //this.resultado = afd.collection('/Resultados/FOR017/FOR017_Prueba%20Cervical_04-03-2020,%2011:13').valueChanges();
  console.log(resultado.patientName);

   }

  ngOnInit() {
  }

}
