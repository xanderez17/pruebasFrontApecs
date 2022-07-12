import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Aula } from 'src/app/models/Aula';
import { AulaService } from 'src/app/services/aula.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-aulas',
  templateUrl: './listar-aulas.component.html',
  styleUrls: ['./listar-aulas.component.css'],
})
export class ListarAulasComponent implements OnInit {
  public lista!: MatTableDataSource<any>;
  cargar = true;

  //datos encabezado tablas
  displayedColumns: string[] = [
    'nombre',
    'capacidad',
    'modalidad',
    'sucursal',
    'direccion',
    'editar',
    'eliminar',
  ];

  //varibel paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor( private servicio: AulaService) {}

  ngOnInit() {

    this.servicio.listar().subscribe((response) => {
      this.lista = new MatTableDataSource(response);
      this.lista.paginator = this.paginador;
      this.lista.sort = this.marSort;});

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

  //emilinar
  eliminar(aula: Aula) {
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
        text: `¿Seguro que quieres eliminar ${aula.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(aula.idAula).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `${aula.nombre} ha  sido eliminado correctamente!`,
              'success'
            );
            location.reload();
          });
        }
      });
  }
}
