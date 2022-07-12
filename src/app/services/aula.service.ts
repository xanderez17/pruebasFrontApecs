import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Aula } from '../models/Aula';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  constructor(private http: HttpClient) {}
  //Obtener aula por id
  getById(idAula: number): Observable<Aula> {
    return this.http.get<Aula>( `http://localhost:9898/api/aula/listar-aula/${idAula}` );
  }
  //Lista aula
  listar(): Observable<Aula[]> {
    return this.http.get<Aula[]>(`http://localhost:9898/api/aula/listarAulas`);
  }
  //Crear Aula
  crear(aula: Aula): Observable<Aula> {
    return this.http
      .post<Aula>(`http://localhost:9898/api/aula/crearAula`, aula)
      .pipe(
        map((response: any) => response.aula as Aula),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar aula
  editar(aula: Aula, idAula: number): Observable<Aula> {
    return this.http
      .put<Aula>(
        `http://localhost:9898/api/aula/actualizarAula/${idAula}`,
        aula
      )
      .pipe(
        map((response: any) => response.aula as Aula),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  //Eliminar aula
  eliminar(id: number): Observable<Aula> {
    return this.http.delete<Aula>(`http://localhost:9898/api/aula/eliminarAula/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
    }
}
