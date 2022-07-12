import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CursosService} from "../../../../services/cursos.service";
import {Curso} from "../../../../models/Curso";
import {CalificacionesService} from "../../../../services/calificaciones.service";
import {Calificaciones} from "../../../../models/Calificaciones";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, ParamMap} from "@angular/router";
import PizZipUtils from "pizzip/utils/index.js";
import PizZip from "pizzip";
import {saveAs} from "file-saver";
import Docxtemplater from "docxtemplater";

//FUNCIONES DOCUMENTO
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-reporte-calificaciones',
  templateUrl: './reporte-calificaciones.component.html',
  styleUrls: ['./reporte-calificaciones.component.css']
})
export class ReporteCalificacionesComponent implements OnInit {
  //Variables
  lista = new Calificaciones();


  constructor(
    private servicio: CalificacionesService,
    public dialogRef: MatDialogRef<ReporteCalificacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {

    this.calificaciones(Number(this.data.anyProperty));
  }

  calificaciones(id: any) {
    this.servicio.getById(Number(id)).subscribe((m: any) => {
      this.lista = m;
      console.log(m);

    });
  }

  //MÉTODOS DOCUMENTOS
  generarReporte() {
    let nombreDocumento = 'reporteCalif.docx'
    let fechaActual = new Date().toLocaleDateString();
    let fechacortada: any[] = fechaActual.split('/');



    //DATA DOCUMENTO
    let dataGeneral: any = {
      dia: fechacortada[0],
      mes: this.devolvermes(fechacortada[1]),
      year: fechacortada[2],
      nombreCurso:this.lista.curso.catalogo.nombre,
      identificacion: this.lista.alumno.identificacion,
      alumno:  this.lista.alumno.apellidoPrimer +
      ' ' +
      this.lista.alumno.apellidoSegundo +
      ' ' +
      this.lista.alumno.nombrePrimer +
      ' ' +
      this.lista.alumno.nombreSegundo,
      asistencia: this.lista.asistencia,
      tareas:  this.lista.tareas,
      trabajos:  this.lista.trabajos,
      examen:  this.lista.examen,
      promedio:  this.lista.promedio,
    };
    this.generate(dataGeneral, 'http://localhost:9898/files/reporteCalif.docx', nombreDocumento);
  }

  generate(nom: any, reporteRequerido: string, nombreDoc: string): void {
    loadFile(reporteRequerido, function (
      error,
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {paragraphLoop: true, linebreaks: true});
      doc.setData({
        ...nom
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
            .join("\n");
          //console.log("errorMessages", errorMessages);
        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      // Output the document using Data-URI
      saveAs(out, nombreDoc);
    });
  }

  devolvermes(mes: any): any {
    switch (mes) {
      case '1':
        return 'enero'
        break;

      case '2':
        return 'febrero'
        break;

      case '3':
        return 'marzo'
        break;

      case '4':
        return 'abril'
        break;

      case '5':
        return 'mayo'
        break;

      case '6':
        return 'junio'
        break;

      case '7':
        return 'julio'
        break;

      case '8':
        return 'agosto'
        break;

      case '9':
        return 'septiembre'
        break;

      case '10':
        return 'octubre'
        break;

      case '11':
        return 'noviembre'
        break;

      case '12':
        return 'diciembre'
        break;
    }
  }
}
