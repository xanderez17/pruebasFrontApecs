import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Parentezco } from '../models/Perentezco';

@Injectable({
  providedIn: 'root'
})
export class ParentezcoService {

  constructor(private http: HttpClient) {
  }

   //Obtener lista por id
   getById(id: number): Observable<Parentezco> {
    return this.http.get<Parentezco>(`http://localhost:9898/api/parentezco/listar-parentezco/${id}`);
  }
    //Listar Parentezco
    listar(): Observable<Parentezco[]> {
      return this.http.get<Parentezco[]>(`http://localhost:9898/api/parentezco/listarParentezcos`);
    }

  //Crear Parentezco
  crear(parentezco: Parentezco): Observable<Parentezco> {
    return this.http.post<Parentezco>(`http://localhost:9898/api/parentezco/`, parentezco).pipe(
      map((response: any) => response.parentezco as Parentezco),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //Editar Parentezco
  editar(parentezco: Parentezco, idParentezco: number): Observable<Parentezco> {
    return this.http.put<Parentezco>(`http://localhost:9898/api/parentezco/actualizarParentezco/${idParentezco}`, parentezco).pipe(
      map((response: any) => response.parentezco as Parentezco),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //Eliminar Parentezco
  eliminar(id: number): Observable<Parentezco> {
    return this.http.delete<Parentezco>(`http://localhost:9898/api/parentezco/eliminarParentezco/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }


}
