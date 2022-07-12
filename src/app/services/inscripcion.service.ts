import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Inscripcion } from '../models/Inscripcion';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  constructor(private http: HttpClient) {}

  //Listar Inscripcion
  listar(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `http://localhost:9898/api/inscripcion/listarInscripciones`
    );
  }


    //Listar Inscripcion por estado curso
    listarbyEstadoCurso(estado: string):  Observable<Inscripcion[]> {
      return this.http.get<Inscripcion[]>(
        `http://localhost:9898/api/inscripcion/listarbyEstadoCurso/${estado}`
      );
    }


    //Listar Inscripcion por CI
    listarbyCI(cedula: string):  Observable<Inscripcion[]> {
      return this.http.get<Inscripcion[]>(
        `http://localhost:9898/api/inscripcion/listarbyCI/${cedula}`
      );
    }

  //Listar Inscripcion
  listarActuales(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `http://localhost:9898/api/inscripcion/listarInscritosActuales`
    );
  }
  //Obtener  por id
  getById(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(
      `http://localhost:9898/api/inscripcion/listar-inscripcion/${id}`
    );
  }
  listarByCurso(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(
      `http://localhost:9898/api/inscripcion/listarbyCurso/${id}`
    );
  }

  //Crear Inscripcion
  crear(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http
      .post<Inscripcion>(`http://localhost:9898/api/inscripcion/`, inscripcion)
      .pipe(
        map((response: any) => response.inscripcion as Inscripcion),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar Inscripcion
  editar(
    inscripcion: Inscripcion,
    idInscripcion: number
  ): Observable<Inscripcion> {
    return this.http
      .put<Inscripcion>(
        `http://localhost:9898/api/inscripcion/actualizarInscripcion/${idInscripcion}`,
        inscripcion
      )
      .pipe(
        map((response: any) => response.inscripcion as Inscripcion),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Eliminar Inscripcion
  eliminar(idInscripcion: number): Observable<Inscripcion> {
    return this.http
      .delete<Inscripcion>(
        `http://localhost:9898/api/inscripcion/eliminarInscripcion/${idInscripcion}`
      )
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
