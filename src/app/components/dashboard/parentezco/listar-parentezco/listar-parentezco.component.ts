import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Parentezco } from 'src/app/models/Perentezco';
import { ParentezcoService } from 'src/app/services/parentezco.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-parentezco',
  templateUrl: './listar-parentezco.component.html',
  styleUrls: ['./listar-parentezco.component.css'],
})
export class ListarParentezcoComponent implements OnInit {
  public lista!: MatTableDataSource<any>;
  //datos encabezado tablas
  displayedColumns: string[] = [
    'representante',
    'telefono',
    'alumno',
    'parentezco',
    'acciones',
  ];

  //varibel paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(private router: Router, private servicio: ParentezcoService) {}

  ngOnInit() {
    this.servicio.listar().subscribe((response) => {
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
  // filtrar
  filtrar($event: any) {
    this.lista.filter = $event.target.value;
  }

  //emininar
  eliminar(p: Parentezco) {
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
        text: `¿Seguro que quieres eliminar  ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(p.idParentezco).subscribe((resp) => {
            this.router.navigateByUrl('dashboard/listar-parentezco');
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `Se ha  sido eliminada correctamente!`,
              'success'
            );
          });
          location.reload();
        }

      });
  }
}
