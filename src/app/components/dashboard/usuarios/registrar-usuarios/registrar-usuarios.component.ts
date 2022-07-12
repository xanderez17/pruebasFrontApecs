import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../../../services/usuario.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor
  (
    private fb:  UntypedFormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar
  )
  {
    this.form = this.fb.group({

    })
  }

  ngOnInit(): void {
  }

}
