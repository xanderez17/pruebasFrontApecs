import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Catalogo } from '../models/Catalogo';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  constructor(private http: HttpClient) {}

  //Lista Catalogo
  listar(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      `http://localhost:9898/api/catalogo/listarCatalogos`
    );
  }

  //Obtener Catalogo por id
  getById(id: number): Observable<Catalogo> {
    return this.http.get<Catalogo>(
      `http://localhost:9898/api/catalogo/listar-catalogo/${id}`
    );
  }
  //Crear Catalogo
  crear(catalogo: Catalogo): Observable<Catalogo> {
    return this.http
      .post<Catalogo>(`http://localhost:9898/api/catalogo/`, catalogo)
      .pipe(
        map((response: any) => response.catalogo as Catalogo),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar catalogo
  editar(catalogo: Catalogo, idCatalogo: number): Observable<Catalogo> {
    return this.http
      .put<Catalogo>(
        `http://localhost:9898/api/catalogo/actualizarCatalogo/${idCatalogo}`,
        catalogo
      )
      .pipe(
        map((response: any) => response.catalogo as Catalogo),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  //Eliminar Catalogo
  eliminar(id: number): Observable<Catalogo> {
    return this.http
      .delete<Catalogo>(
        `http://localhost:9898/api/catalogo/eliminarCatalogo/${id}`
      )
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
