import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css'],
})
export class NuevaCategoriaComponent implements OnInit {
  lista = new Categoria();

  form!: UntypedFormGroup;
  idEdit!: string | null;

  constructor(
    private CategoriaService: CategoriaService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<NuevaCategoriaComponent>,
  ) {
    this.form = this.fb.group({
      nombre: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 ñÑáéíóúÁÉÍÓÚ]*'),
          Validators.minLength(4),
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idEdit = params.get('id');
    });
  }

  agregar() {
    this.CategoriaService.crear(this.lista).subscribe((m) => {
      this._snackBar.open('Categoria creada!', '', {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });

    location.reload();
  }
}
