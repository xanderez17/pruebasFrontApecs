import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContratoService } from '../../../../services/contrato.service';
import { Curso } from '../../../../models/Curso';
import Swal from 'sweetalert2';
import { Contrato } from '../../../../models/Contrato';
import { MatriculaService } from 'src/app/services/matricula.service';
import { Matricula } from 'src/app/models/Matricula';
import { VerContratoComponent } from '../ver-contrato/ver-contrato.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-contratos',
  templateUrl: './listar-contratos.component.html',
  styleUrls: ['./listar-contratos.component.css'],
})
export class ListarContratosComponent implements OnInit {
  public lista!: MatTableDataSource<any>;

  idEdit!: string | null;
  matricula: Matricula[] = [];
  matricula2 = new Matricula();
  cargar = true;
  //Encabezados de Tabla
  displayedColumns: string[] = [
    'idContrato',
    'estado',
    'fechaContrato',
    'observacion',
    'curso',
    'alumno',
    'representante',
    'formaPago',
    'ver',
    'editar',
    'eliminar',
  ];

  //Variables paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];

  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private contratoService: ContratoService,
    private matriculaServicio: MatriculaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contratoService.listarContrato().subscribe((response) => {
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
      }, 500
    )
  }

  //Filtrar Contrato
  filtrar($event: any) {
    this.lista.filter = $event.target.value;
  }
  cargarMatricula(contrato: Contrato) {
    this.matriculaServicio.listar().subscribe((response) => {
      this.matricula = response;
      for (let i = 0; i < this.matricula.length; i++) {
        if (contrato.matricula.idMatricula === this.matricula[i].idMatricula) {
          this.matricula2 = this.matricula[i];
          this.idEdit = this.matricula[i].idMatricula;
        }
      }
      this.matricula2.contrato = false;
      this.matriculaServicio
        .editar(this.matricula2, Number(this.idEdit))
        .subscribe((ma) => {});
    });
  }
  openDialogVerContrato(id: any) {
    this.dialog.open(VerContratoComponent, {
      data: { anyProperty: id },
    });

  }

  //Eliminar Contrato
  eliminar(contrato: Contrato) {
    this.cargarMatricula(contrato);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro?',
        text: `¿Seguro que quieres eliminar el contrato ${contrato.idContrato} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.contratoService
            .eliminarContrato(contrato.idContrato)
            .subscribe((resp) => {
              swalWithBootstrapButtons.fire(
                'Eliminada!',
                `La materia ${contrato.idContrato} ha  sido eliminado correctamente!`,
                'success'
              );
            });
        }
        location.reload();
      });
  }
}
