import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Alumno } from 'src/app/models/Alumno';
import { Asistencia } from 'src/app/models/Asistencia';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { CursosService } from 'src/app/services/cursos.service';
import { Matricula } from 'src/app/models/Matricula';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-crear-asistencia',
  templateUrl: './crear-asistencia.component.html',
  styleUrls: ['./crear-asistencia.component.css'],
})
export class CrearAsistenciaComponent implements OnInit {
  fecha = new Date();
  listaAlumno: Alumno[] = [];
  lista = new Asistencia();
  listaAsistencias: Asistencia[] = [];

  listaMatricula: Matricula[] = [];
  form!: UntypedFormGroup;

  idEdit!: string | null;
  idEditCurso!: string | null;

  //datos encabezado tablas
  displayedColumns: string[] = [
    'identificacion',
    'nombre',
    'apellido',
    'correo',
    `telefono`,
    'horas',
  ];
  constructor(
    private servicio: AsistenciaService,
    private cursoServicio: CursosService,
    private matriculaServicio: MatriculaService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private fb: UntypedFormBuilder
  ) {
    this.form = this.fb.group({
      alumnos: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarListas();
  }

  cargarCurso(id: number) {
    if (!id) {
      return;
    }
    this.cursoServicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista.curso = m;
    });
  }

  cargarListas() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEditCurso = params.get('ic');
    });

    this.cargarCurso(Number(this.idEditCurso));

    this.servicio.listar().subscribe((x) => {
      let lista2Asistencia: Asistencia[] = [];

      for (let i = 0; i < x.length; i++) {
        if (x[i].curso.idCurso === this.lista.curso.idCurso) {
          lista2Asistencia.push(x[i]);
        }
      }
      this.listaAsistencias = lista2Asistencia;
    });

    this.matriculaServicio.listar().subscribe((a) => {
      this.listaMatricula = a;

      let lista2Alumno: Alumno[] = [];
      for (let i = 0; i < this.listaMatricula.length; i++) {
        if (
          this.listaMatricula[i].inscripcion.curso.idCurso ===
          this.lista.curso.idCurso
        ) {
          lista2Alumno.push(this.listaMatricula[i].inscripcion.alumno);
        }
      }
      this.listaAlumno = lista2Alumno;
    });
  }

  onChange() {}
  cargarId(id: any) {
    this.lista = new Asistencia();
    for (let i = 0; i < this.listaAsistencias.length; i++) {
      if (id == this.listaAsistencias[i].idAsistencia) {
        this.lista = this.listaAsistencias[i];
        this.idEdit = this.listaAsistencias[i].idAsistencia;
        return
      }
    }
  }
  agregarAsistencia() {
    if (this.idEdit) {
      this.lista.fechaAsistencia = this.fecha;

      this.servicio.editar(this.lista, Number(this.idEdit)).subscribe((ma) => {
        this._snackBar.open('Asistencia Actualizada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });
    } else {
      this.lista.fechaAsistencia = this.fecha;

      this.servicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Asistencia registrada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        this.cargarListas();
      });
    }
  }

  compareAlumnos(x: Alumno, y: Alumno): boolean {
    return x && y ? x.id === y.id : x === y;
  }
  irLista() {
    this.router.navigateByUrl('dashboard/cursos-docente');
  }
}
