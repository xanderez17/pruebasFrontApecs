import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dias } from '../models/Dias';

@Injectable({
  providedIn: 'root'
})
export class DiasService {

  constructor(private http: HttpClient) {}

  //Lista aula
  listar(): Observable<Dias[]> {
    return this.http.get<Dias[]>(`http://localhost:9898/api/dias/listarDias`);
  }}
