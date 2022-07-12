import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Curso } from '../models/Curso';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private http: HttpClient) {}

  //Listar todo
  listar(): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      `http://localhost:9898/api/curso/listarCursos`
    );
  }
  // listar Cursos actuales
  listarActuales(): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      `http://localhost:9898/api/curso/listarCursosActuales`
    );
  }

  // listar Cursos inscripcion
  listarInscripcion(): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      `http://localhost:9898/api/curso/listarCursosInscripcion`
    );
  }
  // listar Cursos Finalizados
  listarFinalizados(): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      `http://localhost:9898/api/curso/listarCursosFinalizados`
    );
  }
  //Obtener lista por id
  getById(id: number): Observable<Curso> {
    return this.http.get<Curso>(
      `http://localhost:9898/api/curso/listar-curso/${id}`
    );
  }
  //listar por estado
  listarByEStado(estado: string): Observable<Curso> {
    return this.http.get<Curso>(
      `http://localhost:9898/api/curso/listarbyEstado/${estado}`
    );
  }

  //Crear  nuevo
  crear(curso: Curso): Observable<Curso> {
    return this.http
      .post<Curso>(`http://localhost:9898/api/curso/`, curso)
      .pipe(
        map((response: any) => response.curso as Curso),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  //Editar
  editar(curso: Curso, idCurso: number): Observable<Curso> {
    return this.http
      .put<Curso>(
        `http://localhost:9898/api/curso/actualizarCurso/${idCurso}`,
        curso
      )
      .pipe(
        map((response: any) => response.curso as Curso),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  //Eliminar por id
  eliminar(id: number): Observable<Curso> {
    return this.http
      .delete<Curso>(`http://localhost:9898/api/curso/eliminarCurso/${id}`)
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
