import { Catalogo } from './Catalogo';
import { Sucursal } from './Sucursal';
import { Dias } from './Dias';
import { Categoria } from './Categoria';

export class Curso {
  idCurso: any;

  categoria :Categoria= new Categoria();
  catalogo: Catalogo = new Catalogo();
  cupos: any;
  dias: Dias[] = [];
  estado: any;
  fechaInicio: any;
  fechaFin: any;
  fechaInscripcion: any;
  horaInicio: any;
  horaFin: any;
  modalidad: any;
  reserva: any;
  seminarios: any;
  sucursal: Sucursal = new Sucursal();
  titulo: any;
  valorCurso: any;
  valorMatricula: any;
  valorDescuento: any;

}
