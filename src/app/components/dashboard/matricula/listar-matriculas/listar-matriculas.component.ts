import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatriculaService } from '../../../../services/matricula.service';
import Swal from 'sweetalert2';
import { Matricula } from '../../../../models/Matricula';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { VerContratoComponent } from '../../contratos/ver-contrato/ver-contrato.component';
import { MatDialog } from '@angular/material/dialog';
import { ContratoService } from 'src/app/services/contrato.service';
import { Curso } from 'src/app/models/Curso';
import { CursosService } from 'src/app/services/cursos.service';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
@Component({
  selector: 'app-listar-matriculas',
  templateUrl: './listar-matriculas.component.html',
  styleUrls: ['./listar-matriculas.component.css'],
})
export class ListarMatriculasComponent implements OnInit {
  mostra=false;
  datos:any[]=[];
  lista2:Matricula[]=[];
  idEdit!: string | null;
  estado:any;
  public lista!: MatTableDataSource<any>;
  listaCursos: Curso[] = [];
  inscripcion: Inscripcion[] = [];
  inscripcion2 = new Inscripcion();
  cargar = true;

  //Encabezados de Tabla
  displayedColumns: string[] = [
    'fechaMatricula',
    'id',
    'alumno',
    'curso',
    'paralelo',
    'contrato',
    'editar',
    'eliminar',
  ];

  //Variables paginador
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [10, 25, 100];

  // MatPaginator
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private matriculaServicio: MatriculaService,
    private contratoServicio: ContratoService,
    private cursosServicio:CursosService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {

    this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginador._intl.nextPageLabel = 'Siguiente';
    this.paginador._intl.previousPageLabel = 'Anterior';
    this.paginador._intl.firstPageLabel = 'Primera Página';
    this.paginador._intl.lastPageLabel = 'Última Página';
  }


  cargarInscripcionesCursos($event: any) {
    this.mostra=false;
    this.estado = $event;

    if (this.estado != 'todos') {
      this.matriculaServicio.listarbyEstadoCurso(this.estado).subscribe((c: any) => {
        this.cursosServicio.listarByEStado(this.estado).subscribe((cc:any) => {

        this.listaCursos = cc;
        });
        this.lista2=c;
      this.lista = new MatTableDataSource(c);
      this.lista.paginator = this.paginador;
      this.lista.sort = this.marSort;});
    }
    if (this.estado == 'todos') {
      this.matriculaServicio.listar().subscribe((c: any) => {
        this.cursosServicio.listar().subscribe((cc:any) => {

          this.listaCursos = cc;
          });
          this.lista2=c;
        this.lista = new MatTableDataSource(c);
        this.lista.paginator = this.paginador;
        this.lista.sort = this.marSort;
      });
    }
  }

  //Filtrar por cedula
  filtrar($event: any) {
  this.matriculaServicio.listarbyCI($event.target.value).subscribe((c:any)=>{
    this.lista = new MatTableDataSource(c);
    this.lista2=c;
    this.mostra=true;
  })
  }
  cargarMatricula($event: any) {
    this.matriculaServicio.listarByCurso($event.idCurso).subscribe((c: any) => {
      this.lista = new MatTableDataSource(c);
      this.lista2=c;
      this.mostra=true;
    });
  }

  openDialogVerContrato(idMatricula: any) {
    this.contratoServicio.listarbyMatricula(idMatricula).subscribe((c) => {
      let id;
      id = c.idContrato;

         this.dialog.open(VerContratoComponent, {
      data: { anyProperty: id },
    }); });

  }

  //Eliminar Matrícula
  eliminar(matricula: Matricula) {


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
        text: `¿Seguro que quieres eliminar la matrícula ${matricula.idMatricula} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.matriculaServicio
            .eliminar(matricula.idMatricula)
            .subscribe((resp) => {
              swalWithBootstrapButtons.fire(
                'Eliminada!',
                `La matrícula ${matricula.idMatricula} ha  sido eliminada correctamente!`,
                'success'
              );
            });
          location.reload();
        }
      });
  }


  getDatos(){
    this.datos=[];
    this.lista2.forEach(calif =>{
      let repCal: any = {
        alumno: calif.inscripcion.alumno.nombrePrimer+' '+calif.inscripcion.alumno.apellidoPrimer,
        identificacion: calif.inscripcion.alumno.identificacion,
        telefono: calif.inscripcion.alumno.telefono,
        correo: calif.inscripcion.alumno.correo,

      }
      this.datos.push(repCal)

    })
  }



//MÉTODOS DOCUMENTOS
generarReporte() {

  this.getDatos();
  let nombreDocumento = 'reporteCalifGeneral.docx';

let fechaIni= this.lista2[0].inscripcion.curso.fechaFin;
let fechaFi= this.lista2[0].inscripcion.curso.fechaFin;
let pa=this.lista2[0].paralelo.nombre;
let doc= this.lista2[0].paralelo.docente.apellidoPrimer+" "+this.lista2[0].paralelo.docente.apellidoSegundo+" "+this.lista2[0].paralelo.docente.nombrePrimer+" "+this.lista2[0].paralelo.docente.nombreSegundo;
  let nombreCurso1 = this.lista2[0].inscripcion.curso.catalogo.nombre;

  //DATA DOCUMENTO
  let dataGeneral: any = {

    nombreCurso: nombreCurso1,
    fechaInicio:fechaIni,
    fechaFin:fechaFi,
    paralelo:pa,
    docente:doc,
    matricula: this.datos
  };
  this.generate(
    dataGeneral,
    'http://localhost:9898/files/reporteMatriculadosCurso.docx',
    nombreDocumento
  );
}

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 500
    )
  }

generate(nom: any, reporteRequerido: string, nombreDoc: string): void {
  loadFile(reporteRequerido, function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.setData({
      ...nom,
    });
    try {
      doc.render();
    } catch (error) {
      function replaceErrors(key, value) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (
            error,
            key
          ) {
            error[key] = value[key];
            return error;
          },
          {});
        }
        return value;
      }

      //console.log(JSON.stringify({error: error}, replaceErrors));
      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error) {
            return error.properties.explanation;
          })
          .join('\n');
        //console.log("errorMessages", errorMessages);
      }
      throw error;
    }
    const out = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    // Output the document using Data-URI
    saveAs(out, nombreDoc);
  });
}

}
