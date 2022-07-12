import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Aporte } from 'src/app/models/Aporte';
import { AporteService } from 'src/app/services/aporte.service';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aportes',
  templateUrl: './aportes.component.html',
  styleUrls: ['./aportes.component.css'],
  providers: [DatePipe],
})
export class AportesComponent implements OnInit {
  idCurso!: string | null;
  idEdit!: string | null;
  lista = new Aporte();
  listaAportes: Aporte[] = [];
  form!: UntypedFormGroup;
  constructor(
    private route: ActivatedRoute,
    private servicio: AporteService,
    private cursoServicio: CursosService,
    private router: Router,
    private fb: FormBuilder,
    private miDatePipe: DatePipe,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarListas();
  }
  reset() {
    this.lista = new Aporte();
  }
  cargarListas() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idCurso = params.get('ic');
    });

    this.cargarCurso(Number(this.idCurso));

    this.listaAportes = [];
    this.servicio.listar().subscribe((x) => {
      for (let i = 0; i < x.length; i++) {
        if (x[i].curso.idCurso === this.lista.curso.idCurso) {
          this.listaAportes.push(x[i]);
        }
      }
    });
  }

  cargarCurso(id: number) {
    if (!id) {
      return;
    }
    this.cursoServicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista.curso = m;
    });
  }

  agregar() {
    if (this.idEdit) {
      const fecha = this.miDatePipe.transform(this.lista.fecha, 'yyyy-MM-dd');
      this.lista.fecha = fecha;
      this.servicio.editar(this.lista, Number(this.idEdit)).subscribe((ma) => {
        this._snackBar.open('Aporte editado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.reset();
        this.cargarListas();
      });
    } else {
      const fecha = this.miDatePipe.transform(this.lista.fecha, 'yyyy-MM-dd');
      this.lista.fecha = fecha;
      this.servicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Aporte creado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.reset();
        this.cargarListas();
      });
    }
  }

  cargarId(id: any) {
    this.lista = new Aporte();
    for (let i = 0; i < this.listaAportes.length; i++) {
      if (id == this.listaAportes[i].idAporte) {
        this.lista = this.listaAportes[i];
        this.idEdit = this.listaAportes[i].idAporte;
        return;
      }
    }
  }

  eliminar(aporte: Aporte) {
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
        text: `¿Seguro que quieres eliminar ${aporte.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.servicio.eliminar(aporte.idAporte).subscribe((resp) => {
            swalWithBootstrapButtons.fire(
              'Eliminada!',
              `${aporte.nombre} ha  sido eliminado correctamente!`,
              'success'
            );
            this.cargarListas();
          });
        }
      });
  }

  irLista() {
    this.router.navigateByUrl('dashboard/crear-calificacion/'+this.lista.curso.idCurso);
  }
}
