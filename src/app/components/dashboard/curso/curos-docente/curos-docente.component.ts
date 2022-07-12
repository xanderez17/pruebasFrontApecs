import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/Curso';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curos-docente',
  templateUrl: './curos-docente.component.html',
  styleUrls: ['./curos-docente.component.css']
})
export class CurosDocenteComponent implements OnInit {

  public lista: Curso[] = [];
  cargar = true;

  constructor(private servicio: CursosService, private router: Router) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.servicio.listar().subscribe((x: any) => {
      this.lista = x;
    });
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 600
    )
  }


}
