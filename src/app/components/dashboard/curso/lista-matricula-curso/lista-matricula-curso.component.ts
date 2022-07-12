import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/Curso';
import { Matricula } from 'src/app/models/Matricula';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursosService } from 'src/app/services/cursos.service';
import { MatriculaService } from 'src/app/services/matricula.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-matricula-curso',
  templateUrl: './lista-matricula-curso.component.html',
  styleUrls: ['./lista-matricula-curso.component.css'],
})
export class ListaMatriculaCursoComponent implements OnInit {
  public lista!: MatTableDataSource<any>;

  curso = new Curso();
  matricula: Matricula[] = [];
  //datos encabezado tablas
  displayedColumns: string[] = ['id', 'alumno', 'telefono','correo'];
  //Variable paginador
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5,10];
  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;


  constructor(
    private matriculasServicio: MatriculaService,
    private alumnoServicio:AlumnoService,
    private cursoServicio: CursosService,
    public dialogRef: MatDialogRef<ListaMatriculaCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.matriculasServicio.listar().subscribe((p) => {
      this.matricula = p;

      this.getCurso(Number(this.data.anyProperty));

      this.cargarAlumnoMatriculados(Number(this.data.anyProperty));


    });
  }
  getCurso(idCurso: number) {
    this.cursoServicio.getById(idCurso).subscribe((x: any) => {
      this.curso = x;
    });
  }

  cargarAlumnoMatriculados(idCurso: number) {
    this.alumnoServicio.listarAlumnoMatriculadosbyCurso(idCurso).subscribe((p:any) => {
      this.lista = new MatTableDataSource(p);
      this.lista.paginator = this.paginador;

      this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
      this.paginador._intl.nextPageLabel = 'Siguiente';
      this.paginador._intl.previousPageLabel = 'Anterior';
      this.paginador._intl.firstPageLabel = 'Primera Página';
      this.paginador._intl.lastPageLabel = 'Última Página';
    });
  }


  // Eliminar
  eliminar(m: Matricula) {
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
        text: `¿Seguro que quieres eliminar la matricula ${m.idMatricula} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.matriculasServicio.eliminar(m.idMatricula).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              ` ${m.idMatricula} ha  sido eliminada correctamente!`,
              'success'
            );
          });
          location.reload();
        }
      });
  }
}
