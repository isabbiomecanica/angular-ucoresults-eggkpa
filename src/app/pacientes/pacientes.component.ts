import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../paciente';
// import { HEROES } from '../mock-heroes';

import { PacienteService } from '../paciente.service';
import { MessageService } from '../message.service';

import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';

import { MatSort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
  
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[];
  dataSource: MatTableDataSource<Paciente>;
  displayedColumns = ['id', 'name'];

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pacienteService: PacienteService) {

    
   }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

// MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  ngOnInit() {
    this.getPacientes();
    this.dataSource = new MatTableDataSource(this.pacientes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  getPacientes(): void {
    this.pacienteService.getPacientes()
    .subscribe(pacientes => this.pacientes = pacientes);
  }
}