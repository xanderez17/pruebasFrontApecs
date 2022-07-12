import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";

//JWT EXPORTACIONES

import {LoginUsuario} from "../../models/LoginUsuario";
import {TokenService} from "../../services/token.service";
import {AuthService} from "../../services/auth.service";
import {Persona} from "../../models/Persona";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  loading= true;
  fake=false;
  listausuario:Array<Usuario>=[]
  cont: number=0;
  hide = true;

  //VARIABLES JWT - LOGIN
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  username: string;
  password: string;
  roles: string[] = [];
  errMsj: string;
  persona: Persona;


  constructor(
    private fb: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private router:Router,
    private serviceUser:UsuarioService,
    private tokenService: TokenService,
    private authService: AuthService,
    private changeDedectionRef: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.changeDedectionRef.detectChanges();
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.username, this.password);
    console.log(this.loginUsuario)
    this.authService.login(this.loginUsuario).subscribe(data =>{
      console.log(data)
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.authService.listar(data.username).subscribe((x:any) => {
          this.persona = x.persona;
          sessionStorage.setItem('USER', JSON.stringify(this.persona.nombrePrimer + " " + this.persona.apellidoPrimer));
          console.log(x)
        })


        window.location.replace('/')
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.message;
        // console.log(err.error.message);
      }
    );
  }


  ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    this.serviceUser.listar().subscribe((x:any)=>{
      this.listausuario=x;
      for (let us of this.listausuario){
        if (us.username==usuario&&us.password==password){
          this.cont=1;
        }
      }
      if (this.cont==1){
        this.fakeLoading()
      }else{
        this._snackBar.open('Usuario o Contraseña Incorrectos!', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }

  fakeLoading(){
    this.fake=true;
    this.loading=false;
    setTimeout(()=>{
      //Redireccionar al Dashboard
      this.router.navigateByUrl('/dashboard').then((m)=>{
        console.log("Dashbaord")
        this.fake=false;
      })
    }, 2000);
  }


}
