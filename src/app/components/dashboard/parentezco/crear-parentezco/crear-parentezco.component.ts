import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Alumno } from 'src/app/models/Alumno';
import { Parentezco } from 'src/app/models/Perentezco';
import { Representante } from 'src/app/models/Representante';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ParentezcoService } from 'src/app/services/parentezco.service';
import { RepresentanteService } from 'src/app/services/representante.service';

@Component({
  selector: 'app-crear-parentezco',
  templateUrl: './crear-parentezco.component.html',
  styleUrls: ['./crear-parentezco.component.css'],
})
export class CrearParentezcoComponent implements OnInit {
  lista = new Parentezco();

  representante = new Representante();
  listaRepresentantes: Representante[] = [];

  alumno = new Alumno();
  listaAlumnos: Alumno[] = [];

  form!: UntypedFormGroup;
  idEdit!: string | null;
  constructor(
    private servicio: ParentezcoService,
    private alumnoServicio: AlumnoService,
    private representanteServicio: RepresentanteService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.validar();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarID(Number(this.idEdit));
    this.cargarListas();
  }

  cargarListas() {
    this.alumnoServicio.listar().subscribe((p: any) => {
      this.listaAlumnos = p;
    });
    this.representanteServicio.listar().subscribe((p: any) => {
      this.listaRepresentantes = p;
    });
  }
  validar() {
    this.form = this.fb.group({

      repreId: [''],
      repreApellido: [''],
      repreApellido2: [''],
      repreNombre: [''],
      parentezco: ['', Validators.required],
      alumnoId: [''],
      alumnoApellido: [''],
      alumnoApellido2: [''],
      alumnoNombre: [''],
      alumnoNombre2: [''],
      alumnoSexo: [''],
    });
  }
  cargarID(id: number) {
    if (!id) {
      return;
    }
    this.servicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista = m;
    });
  }

  filtrarRepre($event: any) {
    this.representante = new Representante();
    for (let index = 0; index < this.listaRepresentantes.length; index++) {
      if (
        $event.target.value == this.listaRepresentantes[index].identificacion
      ) {
        this.representante = this.listaRepresentantes[index];
      }
    }
  }
  filtrar($event: any) {
    this.alumno = new Alumno();

    for (let index = 0; index < this.listaAlumnos.length; index++) {
      if ($event.target.value == this.listaAlumnos[index].identificacion) {
        this.alumno = this.listaAlumnos[index];
      }
    }
  }
  agregar() {
    if (this.idEdit) {
      this.servicio.editar(this.lista, Number(this.idEdit)).subscribe((ma) => {
        this._snackBar.open('parentezco editado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });
    } else {
      this.lista.alumno = this.alumno;
      this.lista.representante = this.representante;
      this.servicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('parentezco creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });
    }
  }
  irLista() {
    this.router.navigateByUrl('dashboard/listar-parentezco');
  }
}
