import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/Alumno';

import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-estudiantes',
  templateUrl: './listar-estudiantes.component.html',
  styleUrls: ['./listar-estudiantes.component.css'],
})
export class ListarEstudiantesComponent implements OnInit {
  public lista!: MatTableDataSource<any>;
  cargar = true;

  //datos encabezado tablas
  displayedColumns: string[] = [
    'identificacion',
    'apellido',
    'nombre',
    'correo',
    `telefono`,
    'direccion',
    'editar',
    'eliminar'
  ];

  //varibel paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(private alumnoServicio: AlumnoService, private router: Router) { }

  ngOnInit() {
    this.alumnoServicio.listar().subscribe((response) => {
      this.lista = new MatTableDataSource(response);

      this.lista.paginator = this.paginador;
      this.lista.sort = this.marSort;
    });
    this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginador._intl.nextPageLabel = 'Siguiente';
    this.paginador._intl.previousPageLabel = 'Anterior';
    this.paginador._intl.firstPageLabel = 'Primera Página';
    this.paginador._intl.lastPageLabel = 'Última Página';
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 600
    )
  }

  // filtrar
  filtrar($event: any) {
    this.lista.filter = $event.target.value;
  }

  //emininar
  eliminar(alumno: Alumno) {
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
        text: `¿Seguro que quieres eliminar al alumno ${alumno.apellidoPrimer} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.alumnoServicio.eliminar(alumno.id).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `${alumno.apellidoPrimer} ha  sido eliminada correctamente!`,
              'success'
            );

          });
          location.reload();
        }

      });
  }
}
