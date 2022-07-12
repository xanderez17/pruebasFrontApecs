import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Alumno } from '../models/Alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) {}

  //Obtener paralelo por id
  getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>('http://localhost:9898/api/alumno/listar-alumno/'+id);
  }

    //Obtener  por curso
   listarByCurso(id: number): Observable<Alumno> {
      return this.http.get<Alumno>(
        `http://localhost:9898/api/alumno/listarbyCurso/${id}`
      );
    }
    //Listar alumno por CI
    listarbyCI(cedula: string):  Observable<Alumno[]> {
      return this.http.get<Alumno[]>(
        `http://localhost:9898/api/alumno/listarbyCI/${cedula}`
      );
    }

    //Obtener lista inscritos por curso
    listarAlumnoInscritosbyCurso(id: number): Observable<Alumno> {
      return this.http.get<Alumno>(
        `http://localhost:9898/api/alumno/listarAlumnoInscritosbyCurso/${id}`
      );
    }

    //Obtener lista matriculados por curso
    listarAlumnoMatriculadosbyCurso(id: number): Observable<Alumno> {
      return this.http.get<Alumno>(
        `http://localhost:9898/api/alumno/listarAlumnoMatriculadosbyCurso/${id}`
      );
    }




 //Crear alumno
 crear(alumno: Alumno): Observable<Alumno> {
  return this.http.post<Alumno>(`http://localhost:9898/api/alumno/`, alumno).pipe(
    map((response: any) => response.alumno as Alumno),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}

//Editar alumno
editar(alumno: Alumno, id: number): Observable<Alumno> {
  return this.http.put<Alumno>(`http://localhost:9898/api/alumno/actualizarAlumno/${id}`, alumno).pipe(
    map((response: any) => response.alumno as Alumno),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}
//Eliminar alumno
eliminar(id: number): Observable<Alumno> {
  return this.http.delete<Alumno>(`http://localhost:9898/api/alumno/eliminarAlumno/${id}`).pipe(
    catchError((e) => {
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}
  //Lista alumnp
  listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`http://localhost:9898/api/alumno/listarAlumnos`);
  }
}
