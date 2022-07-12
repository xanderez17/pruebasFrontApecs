import {Alumno} from "./Alumno"
import {Curso} from "./Curso";

export class Calificaciones{
  idCalificacion: any;
  asistencia: any;
  trabajos: any;
  tareas:any;
  examen:any;
  promedio:any;
  alumno: Alumno = new Alumno();
  curso: Curso = new Curso();
}
