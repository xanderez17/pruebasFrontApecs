import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Aula } from 'src/app/models/Aula';
import { Sucursal } from 'src/app/models/Sucursal';
import { AulaService } from 'src/app/services/aula.service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-crear-aula',
  templateUrl: './crear-aula.component.html',
  styleUrls: ['./crear-aula.component.css'],
})
export class CrearAulaComponent implements OnInit {
  lista = new Aula();
  listaSucursales: Sucursal[] = [];
  form!: UntypedFormGroup;
  idEdit!: string | null;

  cargar = true;

  constructor(
    private aulaServicio: AulaService,
    private sucursalServicio: SucursalService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({

      nombre: ['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-Z0-9 ñÑáéíóúÁÉÍÓÚ]*'), Validators.minLength(2)])],
      capacidad: ['', Validators.required],
      modalidad: ['', Validators.required],
      sucursal: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarID(Number(this.idEdit));

    this.listarSucursales();
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 600
    )
  }

  listarSucursales() {
    this.sucursalServicio.listar().subscribe((p: any) => {
      this.listaSucursales = p;
    });
  }

  cargarID(id: number) {
    if (!id) {
      return;
    }
    this.aulaServicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista = m;
    });
  }


  compareSucursal(x: Sucursal, y: Sucursal): boolean {
    return x && y ? x.idSucursal === y.idSucursal : x === y;
    }

  agregar() {
    if (this.idEdit) {
      this.aulaServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Aula editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      this.aulaServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Aula creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });


    }
  }
  irLista() {
    this.router.navigateByUrl('dashboard/listar-aulas');
  }
}
