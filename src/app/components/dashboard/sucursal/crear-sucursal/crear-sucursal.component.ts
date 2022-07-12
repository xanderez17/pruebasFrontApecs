import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Sucursal } from 'src/app/models/Sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-crear-sucursal',
  templateUrl: './crear-sucursal.component.html',
  styleUrls: ['./crear-sucursal.component.css'],
})
export class CrearSucursalComponent implements OnInit {
  lista = new Sucursal();
  cargar = true;
  form!: UntypedFormGroup;
  idEdit!: string | null;

  constructor(
    private servicio: SucursalService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre:  ['',Validators.compose( [Validators.required,Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9 ]*'), Validators.minLength(4)])],
      ubicacion:  ['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-Z ñÑáéíóúÁÉÍÓÚ]*'), Validators.minLength(4)])],
      telefono:  ['',  Validators.compose([Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(7)])],
      direccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarSucursal(Number(this.idEdit));
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 600
    )
  }

  cargarSucursal(id: number) {
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

  agregar() {
    if (this.idEdit) {
      this.servicio.editar(this.lista, Number(this.idEdit)).subscribe((ma) => {
        this._snackBar.open('Sucursal editada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });
    } else {
      this.servicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Sucursal creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });
    }
  }
  irLista() {
    this.router.navigateByUrl('dashboard/listar-sucursales');
  }
}
