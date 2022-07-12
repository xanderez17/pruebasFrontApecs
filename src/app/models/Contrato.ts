import { Alumno } from './Alumno';
import { Curso } from './Curso';
import { Matricula } from './Matricula';
import { Representante } from './Representante';
export class Contrato {
  alumno: Alumno = new Alumno();
  idContrato: any;
  estado: any;
  fechaContrato: any;
  formaPago: any;
  matricula: Matricula = new Matricula();
  observacion: any;
  representante: Representante = new Representante();
  curso: Curso = new Curso();
}
