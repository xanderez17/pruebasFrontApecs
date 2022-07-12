import {Alumno} from "./Alumno";
import {Curso} from "./Curso";

export class Certificado{
  idCertificado: any;
  codigoQR: any;
  detalle: any;
  estado: any;
  alumno: Alumno = new Alumno();
  curso: Curso = new Curso();
}
