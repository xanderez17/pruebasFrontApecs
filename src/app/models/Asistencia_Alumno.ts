import { Alumno } from './Alumno';
import { Asistencia } from './Asistencia';

export class AsistenciaAlumno {
  idAsistenciaAlumno: any;
  horas: any;
  asistencia: Asistencia = new Asistencia();
  alumno: Alumno = new Alumno();

}
