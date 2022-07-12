import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-inscripcion-curso',
  templateUrl: './lista-inscripcion-curso.component.html',
  styleUrls: ['./lista-inscripcion-curso.component.css'],
})
export class ListaInscripcionCursoComponent implements OnInit {
  public lista!: MatTableDataSource<any>;

  curso = new Curso();
  inscripcion: Inscripcion[] = [];
  //datos encabezado tablas
  displayedColumns: string[] = ['id', 'alumno', 'telefono', 'correo'];
  //Variable paginador
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;

  constructor(
    private inscripcionesServicio: InscripcionService,
    private alumnoServicio: AlumnoService,
    private cursoServicio: CursosService,
    public dialogRef: MatDialogRef<ListaInscripcionCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.inscripcionesServicio.listar().subscribe((p) => {
      this.inscripcion = p;

      this.getCurso(Number(this.data.anyProperty));
      this.cargarAlumnoInscritos(Number(this.data.anyProperty));


    });
    this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginador._intl.nextPageLabel = 'Siguiente';
    this.paginador._intl.previousPageLabel = 'Anterior';
    this.paginador._intl.firstPageLabel = 'Primera Página';
    this.paginador._intl.lastPageLabel = 'Última Página';
  }
  getCurso(idCurso: number) {
    this.cursoServicio.getById(idCurso).subscribe((x: any) => {
      this.curso = x;
    });
  }

  cargarAlumnoInscritos(idCurso: number) {
    this.alumnoServicio.listarAlumnoInscritosbyCurso(idCurso).subscribe((p:any) => {
      this.lista = new MatTableDataSource(p);
      this.lista.paginator = this.paginador;


    });
  }
  // Filtrar
  filtrar($event: any) {
    this.lista.filter = $event.target.value;
  }

  // Eliminar
  eliminar(inscripcion1: Inscripcion) {
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
        text: `¿Seguro que quieres eliminar la inscripcion ${inscripcion1.idInscripcion} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.inscripcionesServicio
            .eliminar(inscripcion1.idInscripcion)
            .subscribe((resp) => {
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                ` ${inscripcion1.idInscripcion} ha  sido eliminada correctamente!`,
                'success'
              );
            });
          location.reload();
        }
      });
  }
}
