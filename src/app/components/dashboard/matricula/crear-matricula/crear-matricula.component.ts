import { Component, OnInit, ViewChild } from '@angular/core';
import { Matricula } from '../../../../models/Matricula';
import { Alumno } from '../../../../models/Alumno';

import { Paralelo } from '../../../../models/Paralelo';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlumnoService } from '../../../../services/alumno.service';
import { ParaleloService } from '../../../../services/paralelo.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatriculaService } from '../../../../services/matricula.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Curso } from '../../../../models/Curso';

@Component({
  selector: 'app-crear-matricula',
  templateUrl: './crear-matricula.component.html',
  styleUrls: ['./crear-matricula.component.css'],

})
export class CrearMatriculaComponent implements OnInit {
  fecha = new Date();

  numMatricula: any;
  lista = new Matricula();
  alumno = new Alumno();
  curso = new Curso();
  listaAlumnos: Alumno[] = [];
  listaParalelos: Paralelo[] = [];
  listaMatriculas: Matricula[] = [];

  form!: UntypedFormGroup;
  idEdit!: string | null;



  //varibel paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private alumnoServicio: AlumnoService,
    private paraleloServicio: ParaleloService,
    private matriculaServicio: MatriculaService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      paralelo: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });

    this.cargarListas();
    this.cargarDatos(Number(this.idEdit));

  }

  cargarDatos(id: number) {
    if (!id) {
      return;
    }
    this.matriculaServicio.getById(id).subscribe((ma) => {
      if (!ma) {
        return this.irLista();
      }
      this.lista = ma;
    });
  }

  cargarListas() {
    this.alumnoServicio.listar().subscribe((p: any) => {
      this.listaAlumnos = p;
    });

    this.paraleloServicio.listar().subscribe((p: any) => {
      this.listaParalelos = p;
    });
    this.matriculaServicio.listar().subscribe((p: any) => {
      this.listaMatriculas = p;
      this.numMatricula = this.listaMatriculas.length;
    });
  }


  //Filtrar Alumno
  filtrar($event: any) {
    this.alumno = new Alumno();

    for (let index = 0; index < this.listaAlumnos.length; index++) {
      if ($event.target.value == this.listaAlumnos[index].identificacion) {
        this.alumno = this.listaAlumnos[index];
      }
    }
  }
  seleccionarCurso(curso: any) {
    this.curso = curso;
  }
  agregar() {
    if (this.idEdit) {

      this.lista.inscripcion.alumno = this.alumno;
      this.lista.inscripcion.curso = this.curso;
      this.lista.fechaMatricula = this.fecha
      this.matriculaServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Matricula editada!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {

      this.lista.contrato = false;
      this.lista.inscripcion.alumno = this.alumno;
      this.lista.inscripcion.curso = this.curso;
      this.lista.fechaMatricula = this.fecha
      this.matriculaServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Matrícula creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });

   }
  }

  compareParalelo(x: Paralelo, y: Paralelo): boolean {
    return x && y ? x.idParalelo === y.idParalelo : x === y;
  }


  irLista() {
    this.router.navigateByUrl('dashboard/listar-matriculas');
  }
}
