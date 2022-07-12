import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Catalogo } from 'src/app/models/Catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.component.html',
  styleUrls: ['./crear-catalogo.component.css'],
})
export class CrearCatalogoComponent implements OnInit {
  cargar = true;
  lista = new Catalogo();
cuadro:any
  form!: UntypedFormGroup;
  idEdit!: string | null;
  selectedFile: any = null;

  constructor(
    private catalogoServicio: CatalogoService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre:  ['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*'), Validators.minLength(4)])],
      duracion: ['',Validators.compose( [Validators.required,Validators.pattern('^[0-9]*'), Validators.minLength(1)])],
      descripcion:['',Validators.compose( [Validators.required,Validators.pattern('^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ., ]*'), Validators.minLength(4)])],
      img:[''],
      pdf: [''],

    });
  }
  cargarImg(e: any) {
    this.cuadro=null;
    let img = e.target.files
    this.cuadro="1";
    let reader = new FileReader();
    reader.readAsDataURL(img[0]);
    reader.onloadend = () => {

      this.lista.img = reader.result;

    }
  }

  cargarPDF(e: any) {
    this.cuadro=null;
    let pdf = e.target.files
    this.cuadro="1";
    let reader = new FileReader();
    reader.readAsDataURL(pdf[0]);
    reader.onloadend = () => {

      this.lista.pdf = reader.result;

    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
    this.cargarCatalogo(Number(this.idEdit));
  }

  cargarCatalogo(id: number) {
    if (!id) {
      return;
    }
    this.catalogoServicio.getById(id).subscribe((m) => {
      this.cuadro="1";
      if (!m) {
        return this.irLista();
      }
      this.lista = m;
    });
  }

  agregar() {
    if (this.idEdit) {


      this.catalogoServicio
        .editar(this.lista, Number(this.idEdit))
        .subscribe((ma) => {
          this._snackBar.open('Catalogo editado!', '', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.irLista();
        });
    } else {

      this.catalogoServicio.crear(this.lista).subscribe((m) => {
        this._snackBar.open('Catalogo creado!', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.irLista();
      });


    }
  }
  irLista() {
    this.router.navigateByUrl('dashboard/listar-catalogos');
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

  }

  ngAfterViewInit():void{
    setTimeout(()=>{
        this.cargar=false;
      }, 700
    )
  }
}
