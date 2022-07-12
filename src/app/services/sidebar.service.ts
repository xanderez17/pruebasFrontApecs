import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(private _httpClient: HttpClient) { }
  getList<T>(url: string) {
    return this._httpClient.get<T[]>(`${environment.API_URL}/${url}`).pipe(
        retry(1),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
}

}
