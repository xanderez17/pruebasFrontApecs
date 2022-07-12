
import { Alumno } from './Alumno';
import { Curso } from './Curso';

export class Asistencia {
  idAsistencia: any;
  fechaAsistencia: any;
  alumnos:Alumno[]=[];
  curso: Curso = new Curso();
}
