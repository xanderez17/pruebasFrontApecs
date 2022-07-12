import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Representante } from 'src/app/models/Representante';
import { RepresentanteService } from 'src/app/services/representante.service';

@Component({
  selector: 'app-crear-representante',
  templateUrl: './crear-representante.component.html',
  styleUrls: ['./crear-representante.component.css'],
})
export class CrearRepresentanteComponent implements OnInit {
  lista = new Representante();
  form!: UntypedFormGroup;



  constructor(
    private servicio: RepresentanteService,
    private fb: UntypedFormBuilder,
    private router: Router,
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

    });
  }

  ngOnInit(): void {}

  agregar() {
    this.servicio.crear(this.lista).subscribe((m) => {
      this._snackBar.open('Representante creado!', '', {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.irLista();
    });
  }

  irLista() {
    this.router.navigateByUrl('dashboard/listar-representante');
    location.reload();
  }
}
