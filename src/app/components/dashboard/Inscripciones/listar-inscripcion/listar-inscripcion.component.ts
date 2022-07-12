import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/Curso';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { Matricula } from 'src/app/models/Matricula';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import Swal from 'sweetalert2';
import { MatriculaOPComponent } from '../../matricula/matricula-op/matricula-op.component';
import { OPVerMatriculaComponent } from '../opver-matricula/opver-matricula.component';

@Component({
  selector: 'app-listar-inscripcion',
  templateUrl: './listar-inscripcion.component.html',
  styleUrls: ['./listar-inscripcion.component.css'],
})
export class ListarInscripcionComponent implements OnInit {
  public lista!: MatTableDataSource<any>;
  listaCursos: Curso[] = [];

  estado: any;
  cargar = true;

  //datos encabezado tablas
  displayedColumns: string[] = [
    'fecha',
    'cedula',
    'alumno',
    'curso',
    'matricula',
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

  constructor(
    private servicio: InscripcionService,
    private cursosServicio: CursosService,
    private dialog: MatDialog
  ) {}

  ngOnInit() { this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
  this.paginador._intl.nextPageLabel = 'Siguiente';
  this.paginador._intl.previousPageLabel = 'Anterior';
  this.paginador._intl.firstPageLabel = 'Primera Página';
  this.paginador._intl.lastPageLabel = 'Última Página';}

  cargarInscripcionesCursos($event: any) {
    this.estado = $event;

    if (this.estado != 'todos') {
      this.servicio.listarbyEstadoCurso(this.estado).subscribe((c: any) => {
        this.cursosServicio.listarByEStado(this.estado).subscribe((cc: any) => {
          this.listaCursos = cc;
        });
        this.lista = new MatTableDataSource(c);
        this.lista.paginator = this.paginador;
        this.lista.sort = this.marSort;


      });
    }
    if (this.estado == 'todos') {
      this.servicio.listar().subscribe((c: any) => {


        this.cursosServicio.listar().subscribe((cc: any) => {
          this.listaCursos = cc;

        });
        this.lista = new MatTableDataSource(c);
        this.lista.paginator = this.paginador;
        this.lista.sort = this.marSort;

      });
    }
  }

  cargarInscripcion($event: any) {
    this.servicio.listarByCurso($event.idCurso).subscribe((c: any) => {
      this.lista = new MatTableDataSource(c);
    });
  }
  // filtrar
  filtrar($event: any) {
    this.servicio.listarbyCI($event.target.value).subscribe((c: any) => {
      this.lista = new MatTableDataSource(c);
    });
  }

  openDialogMatricular(id: any) {
    this.dialog.open(MatriculaOPComponent, {
      data: { anyProperty: id },
    });
  }
  openDialogVerMatricula(id: any) {
    this.dialog.open(OPVerMatriculaComponent, {
      data: { anyProperty: id },
    });
  }
  //emininar
  eliminar(inscripcion: Inscripcion) {
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
        text: `¿Seguro que quieres eliminarla  inscripcion?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio
            .eliminar(inscripcion.idInscripcion)
            .subscribe((resp) => {
              swalWithBootstrapButtons.fire(
                'Eliminada!',
                ` ${inscripcion.idInscripcion} ha  sido eliminada correctamente!`,
                'success'
              );
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
