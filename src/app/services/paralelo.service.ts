import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Paralelo } from '../models/Paralelo';

@Injectable({
  providedIn: 'root'
})
export class ParaleloService {
  constructor(private http: HttpClient) {}

  //Lista paralelo
  listar(): Observable<Paralelo[]> {
    return this.http.get<Paralelo[]>(`http://localhost:9898/api/paralelo/listarParalelos`);
  }
    //Lista paralelos actuales
    listarActuales(): Observable<Paralelo[]> {
      return this.http.get<Paralelo[]>(`http://localhost:9898/api/paralelo/listarActuales`);
    }

 // listar paralelos Finalizados
 listarFinalizados(): Observable<Paralelo[]> {
  return this.http.get<Paralelo[]>(`http://localhost:9898/api/paralelo/listarFinalizados`);
}
//Obtener paralelo por id
getById(id: number): Observable<Paralelo> {
  return this.http.get<Paralelo>(`http://localhost:9898/api/paralelo/listar-paralelo/${id}`);
}
//Ccrear paralelo
crear(paralelo: Paralelo): Observable<Paralelo> {
return this.http.post<Paralelo>(`http://localhost:9898/api/paralelo/`, paralelo).pipe(
  map((response: any) => response.paralelo as Paralelo),
  catchError((e) => {
    if (e.status == 400) {
      return throwError(e);
    }
    Swal.fire(e.error.mensaje, e.error.error, "error");
    return throwError(e);
  })
);
}

//Editar paralelo
editar(paralelo: Paralelo, idParalelo: number): Observable<Paralelo> {
return this.http.put<Paralelo>(`http://localhost:9898/api/paralelo/actualizarParalelo/${idParalelo}`, paralelo).pipe(
  map((response: any) => response.paralelo as Paralelo),
  catchError((e) => {
    if (e.status == 400) {
      return throwError(e);
    }
    Swal.fire(e.error.mensaje, e.error.error, "error");
    return throwError(e);
  })
);
}
//Eliminar paralelo
eliminar(id: number): Observable<Paralelo> {
return this.http.delete<Paralelo>(`http://localhost:9898/api/paralelo/eliminarParalelo/${id}`).pipe(
  catchError((e) => {
    Swal.fire(e.error.mensaje, e.error.error, "error");
    return throwError(e);
  })
);
}

}

