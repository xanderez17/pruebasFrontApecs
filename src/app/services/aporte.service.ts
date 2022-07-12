import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Aporte } from '../models/Aporte';

@Injectable({
  providedIn: 'root'
})
export class AporteService {
  constructor(private http: HttpClient) {}

  //Listar Aporte
  listar(): Observable<Aporte[]> {
    return this.http.get<Aporte[]>(`http://localhost:9898/api/aporte/listar`);
  }

  //Obtener  por id
  getById(id: number): Observable<Aporte> {
    return this.http.get<Aporte>(
      `http://localhost:9898/api/aporte/listar/${id}`
    );
  }

  //Crear Aporte
  crear(aporte: Aporte): Observable<Aporte> {
    return this.http.post<Aporte>(`http://localhost:9898/api/aporte/crear`, aporte).pipe(
        map((response: any) => response.aporte as Aporte),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar Aporte
  editar(aporte: Aporte, idAporte: number): Observable<Aporte> {
    return this.http.put<Aporte>(`http://localhost:9898/api/aporte/actualizar/${idAporte}`, aporte).pipe(
        map((response: any) => response.aporte as Aporte),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Eliminar Aporte
  eliminar(idAporte: number): Observable<Aporte> {
    return this.http
      .delete<Aporte>(
        `http://localhost:9898/api/aporte/eliminar/${idAporte}`
      )
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error' );
          return throwError(e);
        })
      );
  }
}
