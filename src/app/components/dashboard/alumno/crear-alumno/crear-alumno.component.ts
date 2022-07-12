import { Component, OnInit } from '@angular/core';
import {Alumno} from "../../../../models/Alumno";
import {Inscripcion} from "../../../../models/Inscripcion";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AlumnoService} from "../../../../services/alumno.service";
import {InscripcionService} from "../../../../services/inscripcion.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent implements OnInit {


  lista = new Alumno();

  cargar = true;

  form!: UntypedFormGroup;
  idEdit: any;

  constructor(

    private alumnoServicio: AlumnoService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      primerNombre: ['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*'), Validators.minLength(2)])],
      segundoNombre: ['', Validators.compose( [Validators.required ,Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*'), Validators.minLength(2)])],
      primerApellido: ['', Validators.compose( [Validators.required ,Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*'), Validators.minLength(2)])],
      segundoApellido: ['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*'), Validators.minLength(2)])],
      identificacion: ['', Validators.compose( [Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(10)])],
      fechaNacimiento: ['', Validators.required],
      direccion: ['',Validators.compose([ Validators.required,Validators.pattern('^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ,.\-]*')])],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      telefono: ['',  Validators.compose([Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(7)])],
      sexo: ['', Validators.required],
      ocupacion: ['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'), Validators.minLength(4)])],
      cargo:  ['',Validators.compose( [Validators.required, Validators.minLength(4),Validators.pattern ('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')])],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
       });
    this.cargarID(Number(this.idEdit));
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 600
    )
  }

  cargarID(id: number) {
    if (!id) {
      return;
    }
    this.alumnoServicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista = m;
    });
  }



  agregar() {
    if (this.idEdit) {
      this.alumnoServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Alumno editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      this.lista.asiste=false;
      this.alumnoServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Alumno inscrito!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['access']
        });
        this.irLista();

      });
    }
  }

  irLista() {
    this.router.navigateByUrl('dashboard/listar-alumnos');
  }
}
