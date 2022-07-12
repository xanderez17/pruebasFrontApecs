
import { Inscripcion } from "./Inscripcion";
import {Paralelo} from "./Paralelo";

export class Matricula{
  idMatricula:any;
  fechaMatricula: any;
  inscripcion: Inscripcion = new Inscripcion();
  paralelo: Paralelo = new Paralelo();
  contrato!:boolean;
}
