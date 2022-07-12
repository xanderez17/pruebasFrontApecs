import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { Matricula } from 'src/app/models/Matricula';
import { Paralelo } from 'src/app/models/Paralelo';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ParaleloService } from 'src/app/services/paralelo.service';

@Component({
  selector: 'app-matricula-op',
  templateUrl: './matricula-op.component.html',
  styleUrls: ['./matricula-op.component.css'],
})
export class MatriculaOPComponent implements OnInit {
  fecha = new Date();
  numMatricula: any;

  lista = new Matricula();
  inscripcion = new Inscripcion();
  listaParalelos: Paralelo[] = [];
    listaParalelos2: Paralelo[] = [];
  form!: UntypedFormGroup;


  constructor(
    private paraleloServicio: ParaleloService,
    private matriculaServicio: MatriculaService,
    private inscripcionService: InscripcionService,

    private _snackBar: MatSnackBar,
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<MatriculaOPComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      paralelo: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getInscripcion(Number(this.data.anyProperty));

    this.paraleloServicio.listar().subscribe((p: any) => {
      this.listaParalelos2 = p;
      for (let i = 0; i < this.listaParalelos2.length; i++) {
        if(this.listaParalelos2[i].curso.idCurso===this.inscripcion.curso.idCurso){
          this.listaParalelos.push(this.listaParalelos2[i]);

        }

      }
    });
    this.matriculaServicio.listar().subscribe((p: any) => {
      this.numMatricula = p.length;
    });
  }

  getInscripcion(id: number) {
    this.inscripcionService.getById(id).subscribe((x: any) => {
      this.inscripcion = x;
    });
  }

  agregar() {

      this.lista.contrato = false;
      this.lista.inscripcion = this.inscripcion;
      this.lista.fechaMatricula = this.fecha;

      this.inscripcion.matricula = true;
      this.inscripcionService  .editar(this.inscripcion, Number(this.data.anyProperty))
        .subscribe((ma) => {   });

      this.matriculaServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Matrícula creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        this.irLista();
      });

  }
  compareParalelo(x: Paralelo, y: Paralelo): boolean {
    return x && y ? x.idParalelo === y.idParalelo : x === y;
  }
  irLista() {
    location.reload();
  }
}
