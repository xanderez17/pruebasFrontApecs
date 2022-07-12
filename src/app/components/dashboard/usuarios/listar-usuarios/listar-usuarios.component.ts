import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsuarioService} from "../../../../services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  //VARIABLES
  public lista!: MatTableDataSource<any>;
  listaRoles: Array<any>;

  //DATOS ENCABEZADOS TABLA
  displayedColumns: string[] = [
    'id',
    'nombre',
    'username',
    'email',
    'rol',
    'editar',
    'eliminar'
  ];

  //VARIABLES DE PAGINADOR
  length = 100;
  pageSize = 8;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  // MATPAGINATOR
  pageEvent!: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatSort) marSort!: MatSort;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe((response) => {
      this.lista = new MatTableDataSource(response);
      this.lista.paginator = this.paginador;
      this.lista.sort = this.marSort;

      console.log(response)
      console.log(this.lista)
    });
    this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginador._intl.nextPageLabel = 'Siguiente';
    this.paginador._intl.previousPageLabel = 'Anterior';
    this.paginador._intl.firstPageLabel = 'Primera Página';
    this.paginador._intl.lastPageLabel = 'Última Página';
  }

  obtenerRol(listaRol: any){
    this.listaRoles = new Array<any>();
    for(let rol of listaRol){
      this.listaRoles.push(rol);
    }
  }


}
