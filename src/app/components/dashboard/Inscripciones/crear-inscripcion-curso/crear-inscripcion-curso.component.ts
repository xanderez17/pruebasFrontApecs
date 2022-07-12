import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';

@Component({
  selector: 'app-crear-inscripcion-curso',
  templateUrl: './crear-inscripcion-curso.component.html',
  styleUrls: ['./crear-inscripcion-curso.component.css'],
  providers: [DatePipe],
})
export class CrearInscripcionCursoComponent implements OnInit {
  fecha = new Date();
  estado: any;
  public listaCurso!: MatTableDataSource<any>;

  cargar = true;

  numMatricula: any;
  id: any;
  cursos: Curso[] = [];
  alumno = new Alumno();
  lista = new Inscripcion();

  listaCursoTemp: Curso[] = [];
  listaMatriculas: Inscripcion[] = [];
  listaInscripciones: Inscripcion[] = [];
  mostrar = true;
  mostrarLista=false;
  form!: UntypedFormGroup;
  idEdit!: string | null;

  constructor(
    private alumnoServicio: AlumnoService,
    private cursoServicio: CursosService,
    private inscripcionServicio: InscripcionService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      alumno: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      curso: ['', Validators.required],
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
    this.inscripcionServicio.getById(id).subscribe((ma) => {
      if (!ma) {
        return this.irLista();
      }
      this.lista = ma;
      this.cursoServicio
        .listarActuales()
        .subscribe((c: any) => {
          this.cursos = c;
        });
    }); this.mostrar=false;
    this.mostrarLista=true;
  }

  cargarCursos($event: any) {
    this.estado = $event;
    if (this.estado != 'todos') {
      this.cursoServicio.listarByEStado(this.estado).subscribe((c: any) => {
        this.cursos = c;
      });
    }
    if (this.estado == 'todos') {
      this.cursoServicio.listarActuales().subscribe((c: any) => {
        this.cursos = c;
      });
    }
  }
  cargarListas() {
    this.inscripcionServicio.listar().subscribe((p: any) => {
      this.listaInscripciones = p;
    });
    this.inscripcionServicio.listar().subscribe((p: any) => {
      this.listaMatriculas = p;
      this.numMatricula = this.listaMatriculas.length;
    });
  }

  // filtrar
  filtrar($event: any) {
    this.alumno = new Alumno();
    this.alumnoServicio.listarbyCI($event.target.value).subscribe((c: any) => {
      this.alumno = c[0];
    });
  }

  compareCurso(x: Curso, y: Curso): boolean {
    return x && y ? x.idCurso === y.idCurso : x === y;
  }
  validarInscripcion(curso: any, cedula: any) {
    if (this.listaInscripciones.length == 0) {
      return (this.id = true);
    }


    for (let i = 0; i < this.listaInscripciones.length; i++) {

      if (
       ( cedula.id == this.listaInscripciones[i].alumno.id )&&
        (curso == this.listaInscripciones[i].curso.idCurso
       ) ) {
        this._snackBar.open('Ya se ha inscrito en este curso ', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        return (this.id = false);
      } else {
        this.id = true;
      }
    }
    return this.id;
  }
  agregar() {
    this.validarInscripcion(
      this.lista.curso.idCurso,
      this.alumno
    );
    if (this.idEdit) {
      this.lista.alumno = this.alumno;

      this.lista.fechaInscripcion = this.fecha;
      this.inscripcionServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('inscripcion editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      this.lista.matricula = false;
      this.lista.alumno = this.alumno;

      this.lista.fechaInscripcion = this.fecha;

      if (this.id) {
        this.inscripcionServicio.crear(this.lista).subscribe((m) => {
          this._snackBar.open('Inscripcion creada!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        });
      }
    }
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 500
    )
  }

  irLista() {
    this.router.navigateByUrl('dashboard/listar-inscripciones-actuales');
  }
}
