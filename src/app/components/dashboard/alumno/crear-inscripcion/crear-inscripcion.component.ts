import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Alumno } from 'src/app/models/Alumno';
import { Curso } from 'src/app/models/Curso';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';

@Component({
  selector: 'app-crear-inscripcion',
  templateUrl: './crear-inscripcion.component.html',
  styleUrls: ['./crear-inscripcion.component.css'],
})
export class CrearInscripcionComponent implements OnInit {
  fecha = new Date();
  existe: any;
  id: any;
  lista = new Alumno();
  cargar = true;

  alumno = new Alumno();
  listaAlumnos: Alumno[] = [];
  listaInscripciones: Inscripcion[] = [];
  listaCruso = new Curso();
  inscripcion = new Inscripcion();

  form!: UntypedFormGroup;
  form2!: UntypedFormGroup;
  idEdit: any;

  constructor(
    private cursoServicio: CursosService,
    private alumnoServicio: AlumnoService,
    private inscripcionServicio: InscripcionService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form2 = this.fb.group({});
    this.form = this.fb.group({
      primerNombre: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*'),
          Validators.minLength(2),
        ]),
      ],
      segundoNombre: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*'),
          Validators.minLength(2),
        ]),
      ],
      primerApellido: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*'),
          Validators.minLength(2),
        ]),
      ],
      segundoApellido: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*'),
          Validators.minLength(2),
        ]),
      ],
      identificacion: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(10),
        ]),
      ],
      fechaNacimiento: ['', Validators.required],
      direccion: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ,.-]*'),
        ]),
      ],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      telefono: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(7),
        ]),
      ],
      sexo: ['', Validators.required],
      ocupacion: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
          Validators.minLength(4),
        ]),
      ],
      cargo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'),
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarListas();
    this.cargarCurso(Number(this.idEdit));
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 300
    )
  }

  //Filtrar Alumno
  filtrar($event: any) {
    this.alumno = new Alumno();
    for (let i = 0; i < this.listaAlumnos.length; i++) {
      if ($event.target.value == this.listaAlumnos[i].identificacion) {
        this.alumno = this.listaAlumnos[i];
      }
    }
  }

  cargarListas() {
    this.alumnoServicio.listar().subscribe((p: any) => {
      this.listaAlumnos = p;
    });
    this.inscripcionServicio.listar().subscribe((p: any) => {
      this.listaInscripciones = p;
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
      this.listaCruso = m;
    });
  }
  validarCedula(cedula: any) {
    if (this.listaAlumnos.length == 0) {

      return (this.id = true);
    } else {
      for (let i = 0; i < this.listaAlumnos.length; i++) {
        if (cedula == this.listaAlumnos[i].identificacion) {
          this._snackBar.open('la cédula ya ha sido registrada ', cedula, {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          return (this.id = false);
        }
      }
    }
    //Obtenemos el digito de la region que sonlos dos primeros digitos
    var digito_region = cedula.substring(0, 2);

    //Pregunto si la region existe ecuador se divide en 24 regiones
    if ((digito_region >= 1 && digito_region <= 24) || (digito_region = 30)) {
      // Extraigo el ultimo digito
      var ultimo_digito = cedula.substring(9, 10);

      //Agrupo todos los pares y los sumo
      var pares =
        parseInt(cedula.substring(1, 2)) +
        parseInt(cedula.substring(3, 4)) +
        parseInt(cedula.substring(5, 6)) +
        parseInt(cedula.substring(7, 8));

      //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
      var numero1 = cedula.substring(0, 1);
      numero1 = numero1 * 2;
      if (numero1 > 9) {
        numero1 = numero1 - 9;
      }

      var numero3 = cedula.substring(2, 3);
      numero3 = numero3 * 2;
      if (numero3 > 9) {
        numero3 = numero3 - 9;
      }

      var numero5 = cedula.substring(4, 5);
      numero5 = numero5 * 2;
      if (numero5 > 9) {
        numero5 = numero5 - 9;
      }

      var numero7 = cedula.substring(6, 7);
      numero7 = numero7 * 2;
      if (numero7 > 9) {
        numero7 = numero7 - 9;
      }

      var numero9 = cedula.substring(8, 9);
      numero9 = numero9 * 2;
      if (numero9 > 9) {
        numero9 = numero9 - 9;
      }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;

      //Suma total
      var suma_total = pares + impares;

      //extraemos el primero digito
      var primer_digito_suma = String(suma_total).substring(0, 1);

      //Obtenemos la decena inmediata
      var decena = (parseInt(primer_digito_suma) + 1) * 10;

      //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
      var digito_validador = decena - suma_total;

      //Si el digito validador es = a 10 toma el valor de 0
      if (digito_validador == 10) var digito_validador = 0;

      //Validamos que el digito validador sea igual al de la cedula
      if (digito_validador == ultimo_digito) {
        return (this.id = true);
      } else {
        this._snackBar.open('Cédula incorrecta!', cedula, {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        return (this.id = false);
      }
    } else {
      // imprimimos en consola si la region no pertenece
      this._snackBar.open('Cédula incorrecta!', cedula, {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return (this.id = false);
    }
  }
  agregar() {


    this.validarCedula(this.lista.identificacion);

    this.inscripcion.fechaInscripcion = this.fecha;
    this.inscripcion.curso = this.listaCruso;
    this.lista.asiste=false;
    if (this.id) {

      this.alumnoServicio.crear(this.lista).subscribe((m) => {
        this.alumnoServicio.listar().subscribe((p: any) => {
          this.listaAlumnos = p;

          for (let i = 0; i < this.listaAlumnos.length; i++) {
            if (
              (this.lista.identificacion = this.listaAlumnos[i].identificacion)
            ) {
              this.inscripcion.alumno = this.listaAlumnos[i];
            }
          }

          this.inscripcion.matricula = false;
          //Crear Inscripcion
          this.inscripcionServicio.crear(this.inscripcion).subscribe((m1) => {
            this._snackBar.open('Se ha registrado su inscripcion!', '', {
              duration: 2500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          });
        });
        this.irLista();
      });
    }
  }

  validarInscripcion(curso: any, cedula: any) {
    if (this.listaInscripciones.length == 0) {
      return (this.id = true);
    } else {
      for (let i = 0; i < this.listaInscripciones.length; i++) {

          for (let i = 0; i < this.listaInscripciones.length; i++) {
            if (
              cedula == this.listaInscripciones[i].alumno.identificacion &&
              curso == this.listaInscripciones[i].curso.idCurso
            ) {
              this._snackBar.open('Ud ya se ha inscrito en este curso ', '', {
                duration: 2500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });

              return (this.id = false);
            } else {
              this.id = true;
            }
          }
        }

    }
    return this.id;
  }
  agregar2() {
    this.validarInscripcion(this.listaCruso.idCurso, this.alumno.identificacion);

    //Crear Inscripcion

    this.inscripcion.alumno = this.alumno;
    this.inscripcion.fechaInscripcion = this.fecha;
    this.inscripcion.curso = this.listaCruso;
    this.inscripcion.matricula = false;

    if (this.id) {
      this.inscripcionServicio.crear(this.inscripcion).subscribe((m1) => {
        this._snackBar.open('Se ha registrado su inscripcion!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });
    }
  }

  irLista() {
    this.router.navigateByUrl('inicio');
  }
}
