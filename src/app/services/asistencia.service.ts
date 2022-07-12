import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Asistencia } from '../models/Asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http: HttpClient) {}
  //Obtener Asistencia por id
  getById(idAsistencia: number): Observable<Asistencia> {
    return this.http.get<Asistencia>( `http://localhost:9898/api/asistencia/listar-asistencia/${idAsistencia}` );
  }
  //Lista Asistencia
  listar(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(`http://localhost:9898/api/asistencia/listarAsistencias`);
  }
  //Crear asistencia
  crear(asistencia: Asistencia): Observable<Asistencia> {
    return this.http
      .post<Asistencia>(`http://localhost:9898/api/asistencia/`, asistencia)
      .pipe(
        map((response: any) => response.asistencia as Asistencia),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar Asistencia
  editar(asistencia: Asistencia, idAsistencia: number): Observable<Asistencia> {
    return this.http
      .put<Asistencia>(
        `http://localhost:9898/api/asistencia/actualizarAsistencia/${idAsistencia}`,
        asistencia
      )
      .pipe(
        map((response: any) => response.asistencia as Asistencia),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  //Eliminar Asistencia
  eliminar(id: number): Observable<Asistencia> {
    return this.http.delete<Asistencia>(`http://localhost:9898/api/asistencia/eliminarAsistencia/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
    }
}
