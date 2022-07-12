import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Calificaciones } from '../models/Calificaciones';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  constructor(private http: HttpClient) {}

  //Listar calificaciones
  listar(): Observable<Calificaciones[]> {
    return this.http.get<Calificaciones[]>(`http://localhost:9898/api/calificaciones/listar`);
  }

  //Obtener  por id
  getById(id: number): Observable<Calificaciones> {
    return this.http.get<Calificaciones>(
      `http://localhost:9898/api/calificaciones/listar/${id}`
    );
  }
  //Obtener  por curso
  getByCurso(id: number): Observable<Calificaciones> {
    return this.http.get<Calificaciones>(
      `http://localhost:9898/api/calificaciones/listarbyCurso/${id}`
    );
  }


  //Crear Calificaciones
  crear(calificaciones: Calificaciones): Observable<Calificaciones> {
    return this.http.post<Calificaciones>(`http://localhost:9898/api/calificaciones/crear`, calificaciones).pipe(
        map((response: any) => response.calificaciones as Calificaciones),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar Calificaciones
  editar(calificacion: Calificaciones, idCalificacion: number): Observable<Calificaciones> {
    return this.http.put<Calificaciones>(`http://localhost:9898/api/calificaciones/actualizar/${idCalificacion}`, calificacion).pipe(
      map((response: any) => response.calificacion as Calificaciones),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
    }
  //Eliminar Calificaciones
  eliminar(idCalificacion: number): Observable<Calificaciones> {
    return this.http
      .delete<Calificaciones>(
        `http://localhost:9898/api/calificaciones/eliminar/${idCalificacion}`
      )
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error' );
          return throwError(e);
        })
      );
  }
}
