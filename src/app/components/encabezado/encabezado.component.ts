import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  ocultar = true;

  constructor(
    private dialog:MatDialog,
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {
    this.ocultarBar();
  }


  openDialog(){
    this.dialog.open(LoginComponent)
  }

  ocultarBar() {
    let token = this.tokenService.getAuthorities();
    for(let a of token){
      if(a == 'ROLE_ADMIN'){
        this.ocultar = false;
      }
      console.log(token)
    }
}
}

