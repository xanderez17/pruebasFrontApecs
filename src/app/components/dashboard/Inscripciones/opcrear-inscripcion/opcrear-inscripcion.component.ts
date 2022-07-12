import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';

@Component({
  selector: 'app-opcrear-inscripcion',
  templateUrl: './opcrear-inscripcion.component.html',
  styleUrls: ['./opcrear-inscripcion.component.css'],
})
export class OPCrearInscripcionComponent implements OnInit {
  form!: UntypedFormGroup;
  curso=new  Curso();
  id: any;
  fecha = new Date();
  lista = new Inscripcion();
  listaInscripciones:Inscripcion[]=[];
  alumno = new Alumno();
  constructor(
    private alumnoServicio: AlumnoService,
  private inscripcionServicio:InscripcionService,
    private cursoServicio: CursosService,
   public dialogRef: MatDialogRef<OPCrearInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
       private _snackBar: MatSnackBar,

    private fb: UntypedFormBuilder,
  ) { this.form = this.fb.group({
    alumno: [
      '',
      Validators.compose([
        Validators.required,
            Validators.pattern('^[0-9]*'),
      ]),
    ],

  });
}

  ngOnInit(): void {
    this.getCurso(Number(this.data.anyProperty));


    this.cargarListas();

  }
  // filtrar
  filtrar($event: any) {
    this.alumno = new Alumno();
    this.alumnoServicio.listarbyCI($event.target.value).subscribe((c: any) => {
      this.alumno = c[0];
    });
  }
  cargarListas() {

    this.inscripcionServicio.listar().subscribe((p: any) => {
      this.listaInscripciones = p;
    });
    this.inscripcionServicio.listar().subscribe((p: any) => {
      this.listaInscripciones = p;

    });
  }
  getCurso(idCurso: number) {
    this.cursoServicio.getById(idCurso).subscribe((x: any) => {
      this.curso = x;
      this.lista.curso=this.curso;
    });


  }

  validarInscripcion(curso: any, cedula: any) {
    if (this.listaInscripciones.length == 0) {
      return (this.id = true);
    }
    for (let i = 0; i < this.listaInscripciones.length; i++) {
      if (
        cedula == this.listaInscripciones[i].alumno.identificacion &&
        curso == this.listaInscripciones[i].curso.idCurso
      ) {
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
      this.alumno.identificacion
    );


      this.lista.matricula = false;
      this.lista.alumno = this.alumno;

      this.lista.fechaInscripcion = this.fecha;
console.log(this.lista);


      if (this.id) {
        this.inscripcionServicio.crear(this.lista).subscribe((m) => {
          this._snackBar.open('Inscripcion creada!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });

        });

      this.irLista();
    }
  }

  irLista() {
    location.reload();
  }
}
