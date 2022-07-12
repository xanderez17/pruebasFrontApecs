import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Representante } from 'src/app/models/Representante';
import { RepresentanteService } from 'src/app/services/representante.service';

@Component({
  selector: 'app-editar-representante',
  templateUrl: './editar-representante.component.html',
  styleUrls: ['./editar-representante.component.css'],
})
export class EditarRepresentanteComponent implements OnInit {
  lista = new Representante();
  form!: UntypedFormGroup;
  idEdit: any;
  cargar = true;

  constructor(
    private servicio: RepresentanteService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      primerNombre: ['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(2)])],
      segundoNombre: ['', Validators.compose( [Validators.required ,Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(2)])],
      primerApellido: ['', Validators.compose( [Validators.required ,Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(2)])],
      segundoApellido: ['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(2)])],
      identificacion: ['', Validators.compose( [Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(10)])],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      telefono: ['',  Validators.compose([Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(7)])],
      sexo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');

    });

    this.cargarRepresentante();
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 600
    )
  }

  listarRepresentante() {
    this.servicio.listar().subscribe((p: any) => {
      this.lista = p;
    });
  }

  cargarRepresentante() {
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

  agregar() {
    if (this.idEdit) {
      this.servicio.editar(this.lista, Number(this.idEdit)).subscribe((ma) => {
        this._snackBar.open('Catalogo editado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });
    }
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
    this.router.navigateByUrl('dashboard/listar-representantes');
  }
}
