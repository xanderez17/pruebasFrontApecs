import { Aula } from './Aula';
import { Curso } from './Curso';
import { Docente } from './Docente';

export class Paralelo {
  idParalelo: any;
  nombre: any;
  aula: Aula = new Aula();
  curso: Curso = new Curso();
  docente: Docente = new Docente();
}
