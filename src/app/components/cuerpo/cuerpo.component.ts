import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Curso} from 'src/app/models/Curso';
import {CursosService} from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {

  cargar = true;

  public lista: Curso[] = [];

  pageEvent!: PageEvent;

  constructor(
    private cursoServicio: CursosService) {
  }


  ngOnInit() {

    this.getAll();
  }

  getAll() {
    this.cursoServicio.listarActuales().subscribe((x: any) => {
      this.lista = x;
    });

  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 2000
    )
  }
}
