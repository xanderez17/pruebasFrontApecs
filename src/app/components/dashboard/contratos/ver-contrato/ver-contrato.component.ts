import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { Contrato } from 'src/app/models/Contrato';
import { ContratoService } from 'src/app/services/contrato.service';

@Component({
  selector: 'app-ver-contrato',
  templateUrl: './ver-contrato.component.html',
  styleUrls: ['./ver-contrato.component.css'],
})
export class VerContratoComponent implements OnInit {
  margen: any;
  lista = new Contrato();

  constructor(
    private servicio: ContratoService,
    public dialogRef: MatDialogRef<VerContratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getContrato(Number(this.data.anyProperty));
  }

  getContrato(id: number) {
    this.servicio.getById(id).subscribe((x: any) => {
      this.lista = x;
    });
  }

  // print pdf
  exportPdf() {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(9.5);

    doc.text('CONTRATO Nº ' + this.lista.idContrato, 420, 80,);
    doc.text(
      doc.splitTextToSize(
        'En la ciudad de Cuenca, al ' +
          this.lista.fechaContrato +
          ' Comparecen por una parte el (la) Sr(a)' +
          this.lista.representante.apellidoSegundo +
          ' ' +
          this.lista.representante.apellidoPrimer +
          ' ' +
          this.lista.representante.nombrePrimer +
          ' ' +
          this.lista.representante.nombreSegundo +
          ', que de ahora en adelante se le conocerá como el CONTRATANTE, representente del estudiante cuyos datos se detallan a continuación:',
        450
      ),
      70,
      100,
      { maxWidth: 450, align: 'justify' }
    );
    doc.text(
      doc.splitTextToSize(
        'Cedula: ' +
          this.lista.matricula.inscripcion.alumno.identificacion +
          '  ' +
          'Nombre: ' +
          this.lista.matricula.inscripcion.alumno.apellidoSegundo +
          ' ' +
          this.lista.matricula.inscripcion.alumno.apellidoPrimer +
          ' ' +
          this.lista.matricula.inscripcion.alumno.nombrePrimer +
          ' ' +
          this.lista.matricula.inscripcion.alumno.nombreSegundo +
          '  ' +
          'Fecha Nacimiento :' +
          this.lista.matricula.inscripcion.alumno.fechaNacimiento +
          ' ' +
          'Sexo: ' +
          this.lista.matricula.inscripcion.alumno.sexo +
          ' ' +
          'Dirección: ' +
          this.lista.matricula.inscripcion.alumno.direccion +
          ' ' +
          'Telefono: ' +
          this.lista.matricula.inscripcion.alumno.telefono +
          ' ' +
          'Ocupación: ' +
          this.lista.matricula.inscripcion.alumno.ocupacion +
          ' ' +
          'Cargo: ' +
          this.lista.matricula.inscripcion.alumno.cargo,
        450
      ),
      70,
      140,
      { maxWidth: 450, align: 'justify' }
    );

    doc.text(
      doc.splitTextToSize(
        'Y por otra parte APECS Escuela de Informatica representada por Ing Alexandra Garcia ' +
          'que de ahora en adelante se le conocerá como CONTRATADO, conviene en celebrar el siguiente contrato de capacitación que regirá las siguientes claúsulas: ',
        450
      ),
      70,
      180,
      { maxWidth: 450, align: 'justify' }
    );

    doc.text('PRIMERA: Objetivo del contrato', 70, 230);

    doc.text(
      doc.splitTextToSize(
        'El CONTRATADO proveerá al CONTRATANTE de  Capacitación Profesional en las materias y en los tiempos definidos a continuación:',
        450
      ),
      70,
      240,
      { maxWidth: 450, align: 'justify' }
    );
    doc.text('Materias: ', 70, 280);
    doc.text(
      'Curso: ' + this.lista.matricula.inscripcion.curso.catalogo.nombre,
      70,
      290
    );
    doc.text(
      'Seminarios: ' + this.lista.matricula.inscripcion.curso.seminarios,
      70,
      300
    );

    doc.text('Horarios: ', 70, 320);
    let j = 70;
    for (
      let i = 0;
      i < this.lista.matricula.inscripcion.curso.dias.length;
      i++
    ) {
      doc.text(
        this.lista.matricula.inscripcion.curso.dias[i].descripcion,
        j,
        330
      );
      j = j + 50;

    }
    doc.text(
      '   de: ' +
      this.lista.matricula.inscripcion.curso.horaInicio +
      '    hasta: ' +
      this.lista.matricula.inscripcion.curso.horaFin+
      'Fecha inicio: ' +
        this.lista.matricula.inscripcion.curso.fechaInicio +
        '    Fecha fin: ' +
        this.lista.matricula.inscripcion.curso.fechaFin,
      70,
      340
    );
    doc.text(
      'SEGUNDA: Valor de la Capacitación. El CONTRATANTE se compromete a pagar los siguentes valores:',
      70,
      360
    );
    doc.text(
      'Matricula: ' +
        this.lista.matricula.inscripcion.curso.valorMatricula +
        ' ' +
        'Pension: ' +
        this.lista.matricula.inscripcion.curso.valorCurso +
        '  ' +
        'Forma de Pago: ' +
        this.lista.formaPago,
      70,
      370
    );
    doc.text('Observaciones : ' + this.lista.observacion,70, 380);

    doc.text(
      doc.splitTextToSize(
        'Una vez firmado el presente contrato los valores pagados al centro por concepto dematricula y pensiones NO SON REEMBOLSABLES BAJO NINGUN CONCEPTO.',
        450
      ),
      70,
      400,
      { maxWidth: 450, align: 'justify' }
    );

    doc.text(
      doc.splitTextToSize(
        'Adicinal a estos valores EL CONTRATO se reserva el derecho de cobrar una tasa por concepto de especies valoradas y solicitudes, fijadas y establecidas por la DINEPP por concepto de la emision del certificado al finalizar la capacitación',
        450
      ),
      70,
      440,
      { maxWidth: 450, align: 'justify' }
    );
    doc.text('TERCERA:', 70, 480);

    doc.text(
      doc.splitTextToSize(
        '-Legal. Las partes renuncian a su domicilo y convinen que en cualquier controversia que surgiese sobre la interpretación o incumplimiento del presente contrato será dilucidada ante un juez de lo Civil de la ciudad de Cuenca y que se sujetara al trámite verbal sumario. Para constancia de la aceptación de lo anteriormente estipulado, firman los contratantes en dos ejemplares del mismo tenor y a un solo efecto',
        450
      ),
      70,
      490,
      { maxWidth: 450, align: 'justify' }
    );

    // doc.text('EL CONTRATANTE', this.calculateMiddle(firma, doc, 2), 700);
    const Cont =
      'EL CONTRATANTE                                       EL CONTRATADO';
    const firma =
      '______________________                              ______________________';
    const ci =
      '          C.I. ' +
      this.lista.representante.identificacion +
      '                                      ______________________';
    doc.text(Cont, this.calculateMiddle(Cont, doc, 2), 700);
    doc.text(firma, this.calculateMiddle(firma, doc, 2), 720);
    doc.text(ci, this.calculateMiddle(ci, doc, 2), 740);
    doc.save(
      `${
        this.lista.matricula.inscripcion.alumno.apellidoPrimer +
        this.lista.matricula.inscripcion.alumno.apellidoSegundo +
        this.lista.matricula.inscripcion.alumno.nombrePrimer +
        this.lista.matricula.inscripcion.alumno.nombreSegundo
      }_contrato.pdf`
    );
  }
  calculateMiddle(text: any, doc: jsPDF, div: number): number {
    return (
      doc.internal.pageSize.width / div -
      (doc.getStringUnitWidth(text) * doc.getFontSize()) / div
    );
  }
}
