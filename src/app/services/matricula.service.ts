import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Matricula } from '../models/Matricula';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  constructor(private http: HttpClient) {}

  //Listar Matricula
  listar(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`http://localhost:9898/api/matricula/listarMatriculas`);
  }

  //Obtener  por id
  getById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(
      `http://localhost:9898/api/matricula/listar-matricula/${id}`
    );
  }
     //Listar Inscripcion por estado curso
     listarbyEstadoCurso(estado: string):  Observable<Matricula[]> {
      return this.http.get<Matricula[]>(
        `http://localhost:9898/api/matricula/listarbyEstadoCurso/${estado}`
      );
    }
  buscarParaleloPorInscripcion(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(
      `http://localhost:9898/api/matricula/buscarParaleloPorInscripcion/${id}`
    );
  }
     //Listar Inscripcion por CI
     listarbyCI(cedula: string):  Observable<Matricula[]> {
      return this.http.get<Matricula[]>(
        `http://localhost:9898/api/matricula/listarbyCI/${cedula}`
      );
    }
    listarByCurso(id: number): Observable<Matricula> {
      return this.http.get<Matricula>(
        `http://localhost:9898/api/matricula/listarbyCurso/${id}`
      );
    }
  //Crear Matricula
  crear(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(`http://localhost:9898/api/matricula/`, matricula).pipe(
        map((response: any) => response.matricula as Matricula),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar matricula
  editar(matricula: Matricula, idMatricula: number): Observable<Matricula> {
    return this.http.put<Matricula>(`http://localhost:9898/api/matricula/actualizarMatricula/${idMatricula}`, matricula).pipe(
        map((response: any) => response.matricula as Matricula),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Eliminar Matricula
  eliminar(idMatricula: number): Observable<Matricula> {
    return this.http
      .delete<Matricula>(
        `http://localhost:9898/api/matricula/eliminarMatricula/${idMatricula}`
      )
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error' );
          return throwError(e);
        })
      );
  }
}
