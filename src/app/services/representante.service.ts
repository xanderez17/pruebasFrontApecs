import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Alumno} from "../models/Alumno";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import Swal from "sweetalert2";
import {Representante} from "../models/Representante";

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  constructor(private http: HttpClient) {
  }

   //Obtener lista por id
   getById(id: number): Observable<Representante> {
    return this.http.get<Representante>(`http://localhost:9898/api/representante/listar-representante/${id}`);
  }
    //Listar Representantes
    listar(): Observable<Representante[]> {
      return this.http.get<Representante[]>(`http://localhost:9898/api/representante/listarRepresentantes`);
    }

  //Crear Representante
  crear(representante: Representante): Observable<Representante> {
    return this.http.post<Representante>(`http://localhost:9898/api/representante/`, representante).pipe(
      map((response: any) => response.representante as Representante),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //Editar Representante
  editar(representante: Representante, id: number): Observable<Representante> {
    return this.http.put<Representante>(`http://localhost:9898/api/representante/actualizarRepresentante/${id}`, representante).pipe(
      map((response: any) => response.representante as Representante),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //Eliminar Representante
  eliminar(id: number): Observable<Representante> {
    return this.http.delete<Representante>(`http://localhost:9898/api/representante/eliminarRepresentante/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }


}
