import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Catalogo } from 'src/app/models/Catalogo';
import { Curso } from 'src/app/models/Curso';
import { Dias } from 'src/app/models/Dias';
import { Paralelo } from 'src/app/models/Paralelo';
import { Sucursal } from 'src/app/models/Sucursal';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { CursosService } from 'src/app/services/cursos.service';
import { DiasService } from 'src/app/services/dias.service';
import { ParaleloService } from 'src/app/services/paralelo.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { DatePipe } from '@angular/common';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { NuevaCategoriaComponent } from '../../categoria/nueva-categoria/nueva-categoria.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css'],
  providers: [DatePipe],
})
export class CrearCursoComponent implements OnInit {
  pdf: any;
  lista = new Curso();

  listaDias: Dias[] = [];

  listaParalelos: Paralelo[] = [];

  listaSucursal: Sucursal[] = [];
  listaCategorias: Categoria[] = [];

  catalogos = new Catalogo();
  idEdit!: string | null;

  form!: UntypedFormGroup;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private diasServicio: DiasService,
    private cursoServicio: CursosService,
    private paraleloServicio: ParaleloService,
    private catalogoServicio: CatalogoService,

    private categoriaService: CategoriaService,
    private sucursalesServicio: SucursalService,
    private miDatePipe: DatePipe,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    this.validar();
  }

  ngOnInit(): void {
    this.cargarlistas();

    this.route.params.subscribe(({ idC }) => this.getCatalogo(idC));

    this.route.paramMap.subscribe((p: ParamMap) => {
      this.idEdit = p.get('id');
    });
    this.cargarDatos(Number(this.idEdit));
  }

  private getCatalogo(idC: number) {
    if (!idC) {
      return;
    }
    this.catalogoServicio.getById(idC).subscribe((x: any) => {
      this.catalogos = x;
      this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.catalogos.pdf
      );
    });
  }

  cargarlistas() {
    this.paraleloServicio.listar().subscribe((p: any) => {
      this.listaParalelos = p;
    });

    this.diasServicio.listar().subscribe((p: any) => {
      this.listaDias = p;
    });

    this.sucursalesServicio.listar().subscribe((p: any) => {
      this.listaSucursal = p;
    });
    this.categoriaService.listar().subscribe((p: any) => {
      this.listaCategorias = p;
    });
  }
  dialogNuevaCategoria() {
    this.dialog.open(NuevaCategoriaComponent, {});
  }
  validar() {
    this.form = this.fb.group({
      categoria: ['', Validators.required],
      cupos: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
          Validators.minLength(1),
        ]),
      ],
      descripcion: [''],
      duracion: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*'),
          Validators.minLength(1),
        ]),
      ],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      fechaInscripcion: ['', Validators.required],
      modalidad: ['', Validators.required],
      seminarios: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*'),
          Validators.minLength(4),
        ]),
      ],
      titulo: [''],
      img: [''],
      estado: ['', Validators.required],
      valorMatricula: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9 ,.]*'),
          Validators.minLength(1),
        ]),
      ],
      valorCurso: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9 ,.]*'),
          Validators.minLength(1),
        ]),
      ],
      sucursal: ['', Validators.required],
      valorReserva: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9 ,.]*'),
          Validators.minLength(1),
        ]),
      ],
      valorDescuento: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ,.:$%|()]*'),
          Validators.minLength(4),
        ]),
      ],
      dias: ['', Validators.required],
      horaInicio: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9:]*'),
          Validators.minLength(4),
        ]),
      ],
      horaFin: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9:]*'),
          Validators.minLength(4),
        ]),
      ],
    });

    this.form.controls.descripcion.disable();
    this.form.controls.duracion.disable();
  }

  cargarDatos(id: number) {
    if (!id) {
      return;
    }
    this.cursoServicio.getById(id).subscribe((ma) => {
      if (!ma) {
        return this.irLista();
      }
      this.lista = ma;
    });
  }
  agregar() {
    if (this.idEdit) {
      this.cursoServicio;
      const fechaInicio = this.miDatePipe.transform(
        this.lista.fechaInicio,
        'yyyy-MM-dd'
      );
      this.lista.fechaInicio = fechaInicio;
      const fechaInscripcion = this.miDatePipe.transform(
        this.lista.fechaInscripcion,
        'yyyy-MM-dd'
      );
      this.lista.fechaInscripcion = fechaInscripcion;

      const fechaFin = this.miDatePipe.transform(
        this.lista.fechaFin,
        'yyyy-MM-dd'
      );
      this.lista.titulo=this.lista.catalogo.nombre;
      this.lista.fechaFin = fechaFin;

      this.cursoServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Curso editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {
      const fechaInicio = this.miDatePipe.transform(
        this.lista.fechaInicio,
        'yyyy-MM-dd'
      );
      this.lista.fechaInicio = fechaInicio;

      const fechaInscripcion = this.miDatePipe.transform(
        this.lista.fechaInscripcion,
        'yyyy-MM-dd'
      );
      this.lista.fechaInscripcion = fechaInscripcion;

      const fechaFin = this.miDatePipe.transform(
        this.lista.fechaFin,
        'yyyy-MM-dd'
      );
      this.lista.fechaFin = fechaFin;
      this.lista.catalogo = this.catalogos;
      this.lista.titulo = this.catalogos.nombre;
      this.cursoServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Curso creado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });
    }
  }

  compareSucursal(x: Sucursal, y: Sucursal): boolean {
    return x && y ? x.idSucursal === y.idSucursal : x === y;
  }

  compareParalelo(x: Paralelo, y: Paralelo): boolean {
    return x && y ? x.idParalelo === y.idParalelo : x === y;
  }
  compareCatalogo(x: Catalogo, y: Catalogo): boolean {
    return x && y ? x.idCatalogo === y.idCatalogo : x === y;
  }
  compareCategorias(x: Categoria, y: Categoria): boolean {
    return x && y ? x.idCategoria === y.idCategoria : x === y;
  }
  compareDias(x: Dias, y: Dias): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  irLista() {
    this.router.navigateByUrl('/dashboard/listar-cursos-actuales');
  }
}
