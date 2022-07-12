import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css'],
})
export class ListarCategoriaComponent implements OnInit {
  lista = new Categoria();

  form!: UntypedFormGroup;
  idEdit!: any;
  listaCategoria: Categoria[] = [];
  public listaCategorias!: MatTableDataSource<any>;
  cargar = true;

  //datos encabezado tablas
  displayedColumns: string[] = [ 'nombre', 'descripcion','editar', 'eliminar'];


  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private servicio: CategoriaService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: [        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 ñÑáéíóúÁÉÍÓÚ]*'),
          Validators.minLength(4),   ]),   ],
    descripcion: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 ñÑáéíóúÁÉÍÓÚ]*'),
          Validators.minLength(4),
        ]),
      ]});
  }

  ngOnInit() {
    this.cargarListas();
  }
  // filtrar
  filtrar($event: any) {
    this.listaCategorias.filter = $event.target.value;
  }
  cargarListas() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });


    this.servicio.listar().subscribe((response) => {
      this.listaCategoria = response;
      this.listaCategorias = new MatTableDataSource(response);


      this.listaCategorias.sort = this.marSort;
    });


  }
  cargarId(id: any) {
    this.lista = new Categoria();
    for (let i = 0; i < this.listaCategoria.length; i++) {
      if (id == this.listaCategoria[i].idCategoria) {
        this.lista = this.listaCategoria[i];
        this.idEdit = this.listaCategoria[i].idCategoria;
        return;
      }
    }
  }
  reset() {
    this.lista = new Categoria();
  }
  agregar() {
    if (this.idEdit) {
      this.servicio.editar(this.lista, Number(this.idEdit)).subscribe((ma) => {
        this._snackBar.open('Categoría editado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.cargarListas();
        this.reset();
      });
    } else {
      this.servicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Categoría creada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.cargarListas();
        this.reset();
      });
    }
  }

  //emilinar
  eliminar(categoria: Categoria) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas  seguro?',
        text: `¿Seguro que quieres eliminar ${categoria.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(categoria.idCategoria).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `${categoria.nombre} ha  sido eliminado correctamente!`,
              'success'
            );
            location.reload();
          });
        }
      });
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 500
    )
  }
}
