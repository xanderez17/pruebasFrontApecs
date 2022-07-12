import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Contrato } from '../models/Contrato';
import { catchError, map } from 'rxjs/operators';
import { Curso } from '../models/Curso';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  constructor(private http: HttpClient) {}

  //Listar Contrato
  listarContrato(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(
      `http://localhost:9898/api/contrato/listarContratos`
    );
  }

  //Listar Contrato ID
  getById(idContrato: number): Observable<Contrato> {
    return this.http.get<Contrato>(
      `http://localhost:9898/api/contrato/listar-contrato/${idContrato}`
    );
  }

  //Obtener  por Matricula
  listarbyMatricula(id: number): Observable<Contrato> {
       return this.http.get<Contrato>(
      `http://localhost:9898/api/contrato/listarbyMatricula/${id}`
    );


  }

  //Crear Contrato
  crearContrato(contrato: Contrato): Observable<Contrato> {
    return this.http
      .post<Contrato>('http://localhost:9898/api/contrato/', contrato)
      .pipe(
        map((response: any) => response.contrato as Contrato),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Editar Contrato
  editarContrato(contrato: Contrato, idContrato: number): Observable<Contrato> {
    return this.http
      .put<Contrato>(
        `http://localhost:9898/api/contrato/actualizarContrato/${idContrato}`,
        contrato
      )
      .pipe(
        map((response: any) => response.contrato as Contrato),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  //Eliminar Contrato
  eliminarContrato(id: number): Observable<Contrato> {
    return this.http
      .delete<Contrato>(
        `http://localhost:9898/api/contrato/eliminarContrato/${id}`
      )
      .pipe(
        catchError((e) => {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
