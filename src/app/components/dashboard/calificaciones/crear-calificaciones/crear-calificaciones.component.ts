import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Alumno } from 'src/app/models/Alumno';
import { Calificaciones } from 'src/app/models/Calificaciones';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CalificacionesService } from 'src/app/services/calificaciones.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ReporteCalificacionesComponent } from '../reporte-calificaciones/reporte-calificaciones.component';

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import { Curso } from 'src/app/models/Curso';
import { CursosService } from 'src/app/services/cursos.service';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
@Component({
  selector: 'app-crear-calificaciones',
  templateUrl: './crear-calificaciones.component.html',
  styleUrls: ['./crear-calificaciones.component.css'],
})
export class CrearCalificacionesComponent implements OnInit {
  lista = new Calificaciones();
  listaCalificacion: Calificaciones[] = [];
  public listaCalificaciones!: MatTableDataSource<any>;

  idCurso: any;
  idEdit!: string | null;
  cargar = true;

  public curso = new Curso();
  calificacion: any[] = [];

  form!: UntypedFormGroup;

  listaAlumno: Alumno[] = [];

  //datos encabezado tablas
  displayedColumns: string[] = [
    'id',
    'alumno',
    'asistencia',
    'tareas',
    'trabajos',
    'examen',
    'promedio',
    'reporte',
    'editar',
    'eliminar',
  ];
  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private cursoServicio: CursosService,
    private servicio: CalificacionesService,
    private alumnoServicio: AlumnoService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      alumno: ['', Validators.required],
      asistencia: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      tareas: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      trabajos: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[0-9]*'),
        ]),
      ],
      examen: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[0-9]*'),
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idCurso = params.get('ic');
    });
    this.cursoServicio.getById(Number(this.idCurso)).subscribe((c) => {
      this.curso = c;
    });

    this.cargarListas();
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 600
    )
  }

  cargarListas() {
    this.servicio.getByCurso(Number(this.idCurso)).subscribe((m: any) => {
      this.listaCalificacion = m;
      this.listaCalificaciones = new MatTableDataSource(m);

      this.alumnoServicio
        .listarByCurso(Number(this.idCurso))
        .subscribe((a: any) => {
          this.listaAlumno = a;
          for (let i = 0; i < this.listaAlumno.length; i++) {
            for (let j = 0; j < m.length; j++) {
              if (this.listaAlumno[i].id == m[j].alumno.id) {
                this.listaAlumno.splice(i, 1);
              }
            }
          }
        });
    });
  }

  openDialogVerReporte(id: any) {
    this.dialog.open(ReporteCalificacionesComponent, {
      data: { anyProperty: id },
    });
  }

  reset() {
    this.lista = new Calificaciones();
  }

  compareAlumno(x: Alumno, y: Alumno): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  cargarId(id: any) {
    this.alumnoServicio
      .listarByCurso(Number(this.idCurso))
      .subscribe((a: any) => {
        this.listaAlumno = a;
      });
    this.lista = new Calificaciones();
    this.servicio.getById(Number(id)).subscribe((m) => {
      this.lista = m;
      this.idEdit = m.curso.idCurso;
    });
  }

  agregar() {
    if (this.idEdit) {
      this.lista.curso.idCurso = this.idCurso;
      this.lista.promedio =
        Number(this.lista.asistencia) +
        Number(this.lista.tareas) +
        Number(this.lista.trabajos) +
        Number(this.lista.examen);
      this.servicio.editar(this.lista, Number(this.idEdit)).subscribe((ma) => {
        this.snackBar.open('Calificacion editada!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        this.cargarListas();
        this.lista = new Calificaciones();
      });
    } else {
      this.lista.curso.idCurso = this.idCurso;
      this.lista.promedio =
        Number(this.lista.asistencia) +
        Number(this.lista.tareas) +
        Number(this.lista.trabajos) +
        Number(this.lista.examen);
      this.servicio.crear(this.lista).subscribe((m) => {
        this.snackBar.open('Calificacion guardarda!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.lista = new Calificaciones();
        this.cargarListas();
      });
    }
  }

  eliminar(c: Calificaciones) {
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
        text: `¿Seguro que quieres eliminar la calificacion de: ${c.alumno.apellidoPrimer} ${c.alumno.nombrePrimer} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(c.idCalificacion).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `${c.idCalificacion} ha  sido eliminado correctamente!`,
              'success'
            );
            this.lista = new Calificaciones();
            this.cargarListas();
          });
        }
      });
  }

  //MÉTODOS DOCUMENTOS
  generarReporteGeneral() {

    this.getCalificacionDatos();
    let nombreDocumento = 'reporteCalifGeneral.docx';
    let fechaActual = new Date().toLocaleDateString();
    let fechacortada: any[] = fechaActual.split('/');

    let nombreCurso1 = this.listaCalificacion[0].curso.catalogo.nombre;
    console.log(nombreCurso1);

    //DATA DOCUMENTO
    let dataGeneral: any = {
      dia: fechacortada[0],
      mes: this.devolvermes(fechacortada[1]),
      year: fechacortada[2],
      nombreCurso: nombreCurso1,
      calificacion: this.calificacion
    };
    this.generate(
      dataGeneral,
      'http://localhost:9898/files/reporteCalifGeneral.docx',
      nombreDocumento
    );
  }

  getCalificacionDatos(){
    this.calificacion=[];
    this.listaCalificacion.forEach(calif =>{
      let repCal: any = {
        alumno: calif.alumno.nombrePrimer+' '+calif.alumno.apellidoPrimer,
        asistencia: calif.asistencia,
        tareas: calif.tareas,
        trabajos: calif.trabajos,
        examen: calif.examen,
        promedio: calif.promedio,
      }
      this.calificacion.push(repCal)

    })
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

  devolvermes(mes: any): any {
    switch (mes) {
      case '1':
        return 'enero';
        break;

      case '2':
        return 'febrero';
        break;

      case '3':
        return 'marzo';
        break;

      case '4':
        return 'abril';
        break;

      case '5':
        return 'mayo';
        break;

      case '6':
        return 'junio';
        break;

      case '7':
        return 'julio';
        break;

      case '8':
        return 'agosto';
        break;

      case '9':
        return 'septiembre';
        break;

      case '10':
        return 'octubre';
        break;

      case '11':
        return 'noviembre';
        break;

      case '12':
        return 'diciembre';
        break;
    }
  }

  irLista() {
    this.router.navigateByUrl('dashboard/cursos-docente');
  }
}

//0152354981
