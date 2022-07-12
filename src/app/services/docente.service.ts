import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Docente } from '../models/Docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) {}

    //Listar todo
    listar(): Observable<Docente[]> {
      return this.http.get<Docente[]>(`http://localhost:9898/api/docente/listarDocentes`);
    }

  //Obtener lista por id
  getById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`http://localhost:9898/api/docente/listar-docente/${id}`);
  }
//Crear  nuevo 
crear(docente: Docente): Observable<Docente> {
  return this.http.post<Docente>(`http://localhost:9898/api/docente/`, docente).pipe(
    map((response: any) => response.docente as Docente),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}

//Editar 
editar(docente: Docente, idDocente: number): Observable<Docente> {
  return this.http.put<Docente>(`http://localhost:9898/api/docente/actualizarDocente/${idDocente}`, docente).pipe(
    map((response: any) => response.docente as Docente),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}
//Eliminar por id
eliminar(id: number): Observable<Docente> {
  return this.http.delete<Docente>(`http://localhost:9898/api/docente/eliminarDocente/${id}`).pipe(
    catchError((e) => {
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}

}

