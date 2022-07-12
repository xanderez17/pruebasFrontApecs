import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Catalogo } from 'src/app/models/Catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-catalogo',
  templateUrl: './listar-catalogo.component.html',
  styleUrls: ['./listar-catalogo.component.css'],
})
export class ListarCatalogoComponent implements OnInit {
  public lista: Catalogo[] = [];
  cargar = true;

  constructor(private servicio: CatalogoService, private router: Router) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.servicio.listar().subscribe((x: any) => {
      this.lista = x;
    });
  }

  eliminar(p: Catalogo) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas  seguro?',
        text: `¿Seguro que quieres eliminar   ${p.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(p.idCatalogo).subscribe((resp) => {
            this.router.navigateByUrl('dashboard/listar-catalogos');
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              ` ${p.nombre} ha  sido eliminado correctamente!`,
              'success'
            );
          });
          location.reload();
        }
      });
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 600
    )
  }
}
