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
import { MatriculaService } from 'src/app/services/matricula.service';
import Swal from 'sweetalert2';
import { MatriculaOPComponent } from '../../matricula/matricula-op/matricula-op.component';
import { OPVerMatriculaComponent } from '../opver-matricula/opver-matricula.component';

@Component({
  selector: 'app-lista-inscritos-actuales',
  templateUrl: './lista-inscritos-actuales.component.html',
  styleUrls: ['./lista-inscritos-actuales.component.css'],
})
export class ListaInscritosActualesComponent implements OnInit {
  public lista!: MatTableDataSource<any>;
  paralelo: any;
  matricula: Matricula[] = [];
  listaCursos: Curso[] = [];
  listaInscripiones: Inscripcion[] = [];
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
    private cursoServicio: CursosService,
    private servicio: InscripcionService,
    private matriculaServicio: MatriculaService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarListas();
    this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginador._intl.nextPageLabel = 'Siguiente';
    this.paginador._intl.previousPageLabel = 'Anterior';
    this.paginador._intl.firstPageLabel = 'Primera Página';
    this.paginador._intl.lastPageLabel = 'Última Página';
  }
  cargarListas() {
    this.cursoServicio.listarActuales().subscribe((c) => {
      this.listaCursos = c;
    });
    this.servicio.listarActuales().subscribe((response) => {
      this.lista = new MatTableDataSource(response);
      this.lista.paginator = this.paginador;
      this.lista.sort = this.marSort;

    });
  }
  cargarParalelo(inscripcion: any) {
    this.paralelo = inscripcion.idInscripcion;

    console.log(this.paralelo);
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
          location.reload();
        }
      });
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 500
    )
  }

  compareCurso(x: Curso, y: Curso): boolean {
    return x && y ? x.idCurso === y.idCurso : x === y;
  }
}
