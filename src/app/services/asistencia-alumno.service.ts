import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AsistenciaAlumno } from '../models/Asistencia_Alumno';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaAlumnoService {
  constructor(private http: HttpClient) {}

  //Listar AsistenciaAlumno
  listar(): Observable<AsistenciaAlumno[]> {
    return this.http.get<AsistenciaAlumno[]>(`http://localhost:9898/api/asistenciaAlumno/listar`);
  }

  //Obtener  por id
  getById(id: number): Observable<AsistenciaAlumno> {
    return this.http.get<AsistenciaAlumno>(
      `http://localhost:9898/api/asistenciaAlumno/listar/${id}`
    );
  }

  //Crear AsistenciaAlumno
  crear(asistenciaAlumno: AsistenciaAlumno): Observable<AsistenciaAlumno> {
    return this.http.post<AsistenciaAlumno>(`http://localhost:9898/api/asistenciaAlumno/`, asistenciaAlumno).pipe(
        map((response: any) => response.asistenciaAlumno as AsistenciaAlumno),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar AsistenciaAlumno
  editar(asistenciaAlumno: AsistenciaAlumno, idAsistenciaAlumno: number): Observable<AsistenciaAlumno> {
    return this.http.put<AsistenciaAlumno>(`http://localhost:9898/api/sistenciaAlumno/actualizar/${idAsistenciaAlumno}`, asistenciaAlumno).pipe(
        map((response: any) => response.asistenciaAlumno as AsistenciaAlumno),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Eliminar AsistenciaAlumno
  eliminar(idAsistenciaAlumno: number): Observable<AsistenciaAlumno> {
    return this.http
      .delete<AsistenciaAlumno>(
        `http://localhost:9898/api/asistenciaAlumno/eliminar/${idAsistenciaAlumno}`
      )
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error' );
          return throwError(e);
        })
      );
  }
}
