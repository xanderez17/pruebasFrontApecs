import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Sucursal } from '../models/Sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  constructor(private http: HttpClient) {}

  //Lista Sucursal
  listar(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`http://localhost:9898/api/sucursal/listarSucursal`);
  }

//Obtener Sucursal por id
getById(id: number): Observable<Sucursal> {
  return this.http.get<Sucursal>(`http://localhost:9898/api/sucursal/listar-sucursal/${id}`);
}
//Crear sucursal
crear(sucursal: Sucursal): Observable<Sucursal> {
return this.http.post<Sucursal>(`http://localhost:9898/api/sucursal/`, sucursal).pipe(
  map((response: any) => response.sucursal as Sucursal),
  catchError((e) => {
    if (e.status == 400) {
      return throwError(e);
    }
    Swal.fire(e.error.mensaje, e.error.error, "error");
    return throwError(e);
  })
);
}

//Editar Sucursal
editar(sucursal: Sucursal, idSucursal: number): Observable<Sucursal> {
return this.http.put<Sucursal>(`http://localhost:9898/api/sucursal/actualizarSucursal/${idSucursal}`, sucursal).pipe(
  map((response: any) => response.sucursal as Sucursal),
  catchError((e) => {
    if (e.status == 400) {
      return throwError(e);
    }
    Swal.fire(e.error.mensaje, e.error.error, "error");
    return throwError(e);
  })
);
}
//Eliminar Sucursal
eliminar(id: number): Observable<Sucursal> {
return this.http.delete<Sucursal>(`http://localhost:9898/api/sucursal/eliminarSucursal/${id}`).pipe(
  catchError((e) => {
    Swal.fire(e.error.mensaje, e.error.error, "error");
    return throwError(e);
  })
);
}

}

