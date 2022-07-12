import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Docente } from 'src/app/models/Docente';
import { Sucursal } from 'src/app/models/Sucursal';
import { DocenteService } from 'src/app/services/docente.service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-crear-docente',
  templateUrl: './crear-docente.component.html',
  styleUrls: ['./crear-docente.component.css']
})
export class CrearDocenteComponent implements OnInit {
  lista = new Docente();
  cargar = true;

  listaSucursal: Sucursal[] = [];
  form!: UntypedFormGroup;
 idEdit: any;

 constructor(
   private servicio: DocenteService,
   private sucursalesServicio: SucursalService,
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
     especialidad: ['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-Z ñÑáéíóúÁÉÍÓÚ]*'), Validators.minLength(2)])],

     curriculum:['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-Z ñÑáéíóúÁÉÍÓÚ,.]*'), Validators.minLength(2)])],


     sucursal: ['', Validators.required],
   });
 }

 ngOnInit(): void {
   this.route.paramMap.subscribe((params: ParamMap) => {
     this.idEdit = params.get('id');
   });

   this.cargarAlumno();
   this.cargarlistas();
 }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 600
    )
  }



 cargarAlumno() {
   if (!this.idEdit) {
     return;
   }
   this.servicio.getById(this.idEdit).subscribe((m) => {
     if (!m) {
       return this.irLista();
     }
     this.lista = m;
   });
 }
 cargarlistas() {

  this.sucursalesServicio.listar().subscribe((p: any) => {
    this.listaSucursal = p;
  });
}
 agregar() {
  if (this.idEdit) {
    this.servicio .editar(this.lista, Number(this.idEdit))
      .subscribe((ma) => {
        this._snackBar.open('Representante editado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });

  } else {
   this.servicio.crear(this.lista).subscribe((m) => {
     this._snackBar.open('Representante creado!', '', {
       duration: 2500,
       horizontalPosition: 'center',
       verticalPosition: 'bottom',
     });
     this.irLista();
   });


 }
}
 compareSucursal(x: Sucursal, y: Sucursal): boolean {
  return x && y ? x.idSucursal === y.idSucursal : x === y;
}
 irLista() {
   this.router.navigateByUrl('dashboard/listar-docentes');

 }
}
