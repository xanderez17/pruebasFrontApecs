import { Alumno } from "./Alumno";
import { Persona } from "./Persona";
import { Representante } from "./Representante";

export class Parentezco{
  idParentezco:any;
  representante:Representante = new Representante();
  alumno: Alumno= new Alumno();
  relacionParentezco:any;
}
