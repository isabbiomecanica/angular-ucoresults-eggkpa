import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Paciente } from './paciente';
import { datoPaciente } from './datopaciente';

import { Prueba } from './prueba';

import { MessageService } from './message.service';


import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'firebase/firestore';


import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", 'Access-Control-Allow-Origin':'*', "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"}) //, "Authorization": "c31z" })
};


import { UTPatient } from '../clases/UTPatient.ts';


export const PACIENTES: Paciente[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

// export Dato: Paciente[];

@Injectable({
  providedIn: 'root',
})
export class PacienteService {

  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;
  Dato : Paciente[] = [];
  pruebas : Prueba[] = [];

  constructor(private messageService: MessageService, public afd: AngularFireDatabase, private http: HttpClient) {
    
   }

  getPacientes(): Observable<Paciente[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('PacienteService: fetched pacientes');
    console.log(this.Dato.length);
    //return of(PACIENTES);
    // Use snapshotChanges().map() to store the key
    console.log("Listado");
    this.itemsRef=this.afd.list('/Usuarios');
    this.itemsRef.snapshotChanges().subscribe(data => { 
      this.Dato = [];
      var contador: number = 0;
      data.forEach(item => {
        let tempPaciente : Paciente = {id: 1,name: "Vacio"};
        contador = contador + 1;
        tempPaciente.id = contador;
        tempPaciente.name = item.payload.val();
        this.Dato.push(tempPaciente as Paciente);
        // podría ver aquí las pruebas
      })
      console.log("Fin Pacientes");
      console.log(this.Dato.length);
    })
    console.log("Salgo");
    console.log(this.Dato.length);
    return of(this.Dato);
   
  }

  getPaciente(id: number): Observable<Paciente> {
  // TODO: send the message _after_ fetching the hero
  this.messageService.add(`PacienteService: fetched paciente id=${id}`);
  //return of(PACIENTES.find(paciente => paciente.id === id));
  return of(this.Dato.find(paciente => paciente.id === id));
  }

  getUTPatient(PatientURL: string): Observable<UTPatient> {
    let elPaciente: UTPatient = [];
    elPaciente.PatientName ="Ejemplo";
    console.log(elPaciente.PatientName);
    
    
    return this.http.get<UTPatient>(PatientURL, httpOptions).pipe(
        //retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getPruebas(): Observable<Prueba[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('PacienteService: fetched pruebas');
    console.log(this.pruebas.length);
    console.log("Listado Pruebas");
    // hacer un bucle por pacientes
    //console.log("Cuantos Pacientes");
    //console.log(this.Dato.length);
    //this.Dato.forEach(pitem => { console.log(pitem);})

    this.itemsRef=this.afd.list('/Pruebas');
    this.itemsRef.snapshotChanges().subscribe(data => { 
      this.pruebas = [];
      var contador: number = 0;
      data.forEach(item => {
        item.payload.forEach( laprueba => { 
          //console.log(laprueba);
          let tempPrueba : Prueba = {id: 1, name: "Vacio", descripcion: "Vacio", datetime: "Vacio"};
          contador = contador + 1;
          tempPrueba.id = contador;
          let cadena = <String> laprueba.val();
          let splitted = cadena.split("_"); 
          tempPrueba.name = splitted[0];
          tempPrueba.descripcion = splitted[1];
          tempPrueba.datetime = splitted[2];
          this.pruebas.push(tempPrueba as Prueba);
        })
      })
      console.log("Fin Pruebas");
      console.log(this.pruebas.length);
      //console.log(this.pruebas);
    })
    console.log("Salgo");
    console.log(this.pruebas.length);
    return of(this.pruebas);
   
  }

}