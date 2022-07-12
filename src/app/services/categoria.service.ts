import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  //Listar Categoria
  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      `http://localhost:9898/api/categoria/listar`
    );
  }

  //Obtener  por id
  getById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(
      `http://localhost:9898/api/categoria/listar/${id}`
    );
  }

  //Crear Categoria
  crear(categoria: Categoria): Observable<Categoria> {
    return this.http
      .post<Categoria>(`http://localhost:9898/api/categoria/crear`, categoria)
      .pipe(
        map((response: any) => response.categoria as Categoria),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar Categoria
  editar(categoria: Categoria, idCategoria: number): Observable<Categoria> {
    return this.http
      .put<Categoria>(
        `http://localhost:9898/api/categoria/actualizar/${idCategoria}`,
        categoria
      )
      .pipe(
        map((response: any) => response.categoria as Categoria),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Eliminar Categoria
  eliminar(idCategoria: number): Observable<Categoria> {
    return this.http
      .delete<Categoria>(
        `http://localhost:9898/api/categoria/eliminar/${idCategoria}`
      )
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
