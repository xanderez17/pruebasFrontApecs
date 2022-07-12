import { Alumno } from "./Alumno";
import { Curso } from "./Curso";

export class Inscripcion {
  idInscripcion:any
  alumno: Alumno = new Alumno();
  fechaInscripcion:any;
  curso:Curso=new Curso();
    matricula!: Boolean;
}
