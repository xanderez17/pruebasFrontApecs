import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/Curso';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import { Matricula } from 'src/app/models/Matricula';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { MatriculaService } from 'src/app/services/matricula.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { ListaInscripcionCursoComponent } from '../lista-inscripcion-curso/lista-inscripcion-curso.component';
import { ListaMatriculaCursoComponent } from '../lista-matricula-curso/lista-matricula-curso.component';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css'],
})
export class ListarCursosComponent implements OnInit {
  estado: any;
  public lista!: MatTableDataSource<any>;
  cursos: Curso[] = [];
  listaInscritos: any;
  listaMatriculados: any;
  cargar = true;

  matricula: Matricula[] = [];
  inscripcion: Inscripcion[] = [];

  //datos encabezado tablas
  displayedColumns: string[] = [
    'titulo',

    'cupos',
    'duracion',
    'categoria',
    'sucursal',
    'fechaInicio',

    'estado',
    'inscritos',
    'matriculados',

    'editar',
    'eliminar',
  ];

  //Variable paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private servicio: CursosService,
    private matriculaServicio: MatriculaService,
    private inscripcionesServicio: InscripcionService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarLista();
    this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
      this.paginador._intl.nextPageLabel = 'Siguiente';
      this.paginador._intl.previousPageLabel = 'Anterior';
      this.paginador._intl.firstPageLabel = 'Primera Página';
      this.paginador._intl.lastPageLabel = 'Última Página';
  }
  cargarLista() {
    this.matriculaServicio.listar().subscribe((p) => {
      this.matricula = p;
    });

    this.inscripcionesServicio.listar().subscribe((p) => {
      this.inscripcion = p;
    });

  }
  filtrar($event: any) {
    this.lista.filter = $event.target.value;
  }
  cargarCursos($event: any) {
    this.estado = $event;

    if (this.estado != 'todos') {
      this.servicio.listarByEStado(this.estado).subscribe((c:any) => {
        this.lista = new MatTableDataSource(c);
        this.lista.paginator = this.paginador;
      this.lista.sort = this.marSort;


      });
    }else{
      this.servicio.listar().subscribe((c:any) => {
        this.lista = new MatTableDataSource(c);
        this.lista.paginator = this.paginador;
      this.lista.sort = this.marSort;


      });
    }
  }
  cargarNumeroInscripcioAlumno(curso: Curso) {
    let cont = 0;
    for (let i = 0; i < this.inscripcion.length; i++) {
      if (curso.idCurso === this.inscripcion[i].curso.idCurso) {
        cont++;
      }
    }
    this.listaInscritos = cont;
  }

  cargarNumeroMatriculaAlumno(curso: Curso) {
    let cont = 0;
    for (let i = 0; i < this.matricula.length; i++) {
      if (curso.idCurso === this.matricula[i].inscripcion.curso.idCurso) {
        cont++;
      }
    }
    this.listaMatriculados = cont;
  }
  openDialogMatricula(id: any) {
    this.dialog.open(ListaMatriculaCursoComponent, {
      data: { anyProperty: id },
    });
  }
  openDialogInscripcion(id: any) {
    this.dialog.open(ListaInscripcionCursoComponent, {
      data: { anyProperty: id },
    });
  }

  // Eliminar
  eliminar(curso: Curso) {
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
        text: `¿Seguro que quieres eliminar al curso ${curso.idCurso} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(curso.idCurso).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              ` ${curso.idCurso} ha  sido eliminada correctamente!`,
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

  exportExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.lista.data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Hoja1');
    XLSX.writeFile(workBook, 'ListaCursos' + this.estado + '.xlsx');
  }
}
