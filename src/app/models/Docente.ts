import { Persona } from './Persona';
import {Sucursal} from "./Sucursal";

export class Docente extends Persona {
  especialidad: any;
  sucursal: Sucursal = new Sucursal();
  curriculum: any;
}
