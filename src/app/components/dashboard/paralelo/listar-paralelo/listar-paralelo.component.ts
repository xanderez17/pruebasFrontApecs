import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Matricula } from 'src/app/models/Matricula';
import { Paralelo } from 'src/app/models/Paralelo';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ParaleloService } from 'src/app/services/paralelo.service';
import Swal from 'sweetalert2';
import { VerAlumnosComponent } from '../ver-alumnos/ver-alumnos.component';

@Component({
  selector: 'app-listar-paralelo',
  templateUrl: './listar-paralelo.component.html',
  styleUrls: ['./listar-paralelo.component.css'],
})
export class ListarParaleloComponent implements OnInit {
  estado: any;
  numAlumno: any;
  public lista!: MatTableDataSource<any>;
  ListaMatricula: Matricula[] = [];
  cargar = true;
  //datos encabezado tablas
  displayedColumns: string[] = [
    'nombre',
    'aula',
    'curso',
    'alumnos',
    'editar',
    'eliminar',
  ];

  //varibel paginador
  length = 100;
  pageSize = 8;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private router: Router,
    private paraleloServicio: ParaleloService,
    private matriculaServicio: MatriculaService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarParalelos(this.estado);
    this.matriculaServicio.listar().subscribe((p) => {
      this.ListaMatricula = p;
    });
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 500
    )
  }

  // filtrar
  filtrar($event: any) {
    this.lista.filter = $event.target.value;
  }

  cargarParalelos($event: any) {
    this.estado = $event;

    if (this.estado == 'todos') {
      this.paraleloServicio.listar().subscribe((response) => {

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
    if (this.estado == 'finalizado') {
      this.paraleloServicio.listarFinalizados().subscribe((response) => {

        this.lista = new MatTableDataSource(response);
        this.lista.paginator = this.paginador;
        this.lista.sort = this.marSort;
      });
      this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
      this.paginador._intl.nextPageLabel = 'Siguiente';
      this.paginador._intl.previousPageLabel = 'Anterior';
      this.paginador._intl.firstPageLabel = 'Primera Página';
      this.paginador._intl.lastPageLabel = 'Última Página';
    } else {
      this.paraleloServicio.listarActuales().subscribe((response) => {


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
  }
  dialogVer(id: any) {
    this.dialog.open(VerAlumnosComponent, {
      data: { anyProperty: id },
    });
  }

  cargarNumeroAlumno(paralelo: Paralelo) {
    let cont = 0;
    for (let i = 0; i < this.ListaMatricula.length; i++) {
      if (paralelo.idParalelo === this.ListaMatricula[i].paralelo.idParalelo) {
        cont++;
      }
    }
    this.numAlumno = cont;
  }
  //emininar
  eliminar(p: Paralelo) {
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
        text: `¿Seguro que quieres eliminar paralelo ${p.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.paraleloServicio.eliminar(p.idParalelo).subscribe((resp) => {
            this.router.navigateByUrl('dashboard/listar-paralelos');
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `Paralelo ${p.nombre} ha  sido eliminada correctamente!`,
              'success'
            );
          });
          location.reload();
        }
      });
  }
}
