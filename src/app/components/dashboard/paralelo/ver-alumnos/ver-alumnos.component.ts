import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/Alumno';
import { Matricula } from 'src/app/models/Matricula';
import { Paralelo } from 'src/app/models/Paralelo';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ParaleloService } from 'src/app/services/paralelo.service';

@Component({
  selector: 'app-ver-alumnos',
  templateUrl: './ver-alumnos.component.html',
  styleUrls: ['./ver-alumnos.component.css'],
})
export class VerAlumnosComponent implements OnInit {
  public lista!: MatTableDataSource<any>;

  //datos encabezado tablas
  displayedColumns: string[] = [
    'id',
    'apellido1',
    'apellido2',
    'nombre1',
    'nombre2',
  ];
  //varibel paginador

  pageSize = 5;
  pageSizeOptions: number[] = [5,10];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  matricula = new Matricula();
  paralelo = new Paralelo();
  listaAlumnos: Alumno[] = [];
  listaAlumnos2: Alumno[] = [];
  listaMatriculas: Matricula[] = [];
  constructor(
    public dialogRef: MatDialogRef<VerAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnoServicio: AlumnoService,
    private matriculaServicio: MatriculaService,
    private paraleloServicio: ParaleloService
  ) {}

  ngOnInit(): void {
    this.cargarListas();



  }
  cargarListas() {
    this.paraleloServicio
      .getById(Number(this.data.anyProperty))
      .subscribe((x: any) => {
        this.paralelo = x;
      });
    this.matriculaServicio.listar().subscribe((p) => {
      this.listaMatriculas = p;

      this.alumnoServicio.listar().subscribe((p) => {
        this.listaAlumnos2 = p;

        this.cargarAlumnos();
      });
    });
  }

  cargarAlumnos() {
    for (let j = 0; j < this.listaMatriculas.length; j++) {



      if (
        (this.paralelo.idParalelo == this.listaMatriculas[j].paralelo.idParalelo)
      ) {

        this.listaAlumnos.push(this.listaMatriculas[j].inscripcion.alumno);


      }
    }

  this.lista = new MatTableDataSource(this.listaAlumnos);
  this.lista.paginator = this.paginador;
  this.lista.sort = this.marSort;

  this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
  this.paginador._intl.nextPageLabel = 'Siguiente';
  this.paginador._intl.previousPageLabel = 'Anterior';
  this.paginador._intl.firstPageLabel = 'Primera Página';
  this.paginador._intl.lastPageLabel = 'Última Página'; }
}
