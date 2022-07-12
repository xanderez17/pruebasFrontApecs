import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Aula } from 'src/app/models/Aula';
import { Curso } from 'src/app/models/Curso';
import { Docente } from 'src/app/models/Docente';
import { Paralelo } from 'src/app/models/Paralelo';
import { AulaService } from 'src/app/services/aula.service';
import { CursosService } from 'src/app/services/cursos.service';
import { DocenteService } from 'src/app/services/docente.service';
import { ParaleloService } from 'src/app/services/paralelo.service';

@Component({
  selector: 'app-crear-paralelo',
  templateUrl: './crear-paralelo.component.html',
  styleUrls: ['./crear-paralelo.component.css'],
})
export class CrearParaleloComponent implements OnInit {
  lista = new Paralelo();
  listaAulas: Aula[] = [];
  listaCursos: Curso[] = [];
  listaCursoTemp: Curso[] = [];
  listaDocentes: Docente[] = [];
  formParalelo!: UntypedFormGroup;
  idEdit!: string | null;
  cargar = true;

  constructor(
    private aulaServicio: AulaService,
    private cursoServicio: CursosService,
    private docenteServicio: DocenteService,
    private paraleloServicio: ParaleloService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.formParalelo = this.fb.group({
      nombre: ['',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*'),
        Validators.minLength(3),
      ]),
    ],
      aula: ['', Validators.required],
      docente: ['', Validators.required],
      curso: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarParalelo(Number(this.idEdit));
    this.cargaListas();
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 500
    )
  }

  cargaListas() {
    this.aulaServicio.listar().subscribe((p: any) => {
      this.listaAulas = p;
    });
    this.docenteServicio.listar().subscribe((p: any) => {
      this.listaDocentes = p;
    });
    this.cursoServicio.listar().subscribe((p: any) => {
      for (let i = 0; i < p.length; i++) {
        if (p[i].estado != 'finalizado') {
          this.listaCursoTemp.push(p[i]);
        }
      }
      this.listaCursos = this.listaCursoTemp;
    });
  }

  cargarParalelo(id: number) {
    if (!id) {
      return;
    }
    this.paraleloServicio.getById(id).subscribe((m) => {
      if (!m) {
        return this.irLista();
      }
      this.lista = m;
    });
  }
  compareAula(x: Aula, y: Aula): boolean {
    return x && y ? x.idAula === y.idAula : x === y;
  }

  compareDocente(x: Docente, y: Docente): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  compareCurso(x: Curso, y: Curso): boolean {
    return x && y ? x.idCurso === y.idCurso : x === y;
  }

  agregar() {
    if (this.idEdit) {
      this.paraleloServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Paralelo editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {


      this.paraleloServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Paralelo creado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        this.irLista();

      });
    }
  }
  irLista() {
    this.router.navigateByUrl('dashboard/listar-paralelos');

  }
}
