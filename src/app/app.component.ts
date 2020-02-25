import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';

//import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import 'firebase/firestore';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  title = 'Resultados de pacientes';
  items: Observable<any[]>;
  
  /* constructor(firestore: AngularFirestore) {
   this.items = firestore.collection('Usuarios').valueChanges();
   firestore.
   this.db.database.ref(‘/test’).once(‘value’).then(data => {
     console.log(data); //300ms later
 });
  }*/
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(public afd: AngularFireDatabase) {
    this.itemsRef = afd.list('Usuarios');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      console.log(changes);
      return changes.map(c => ({ key: c.payload.key, usuario: c.payload.val() })      )
      ;
    });


  }
}
