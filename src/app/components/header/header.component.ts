import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TokenService} from "../../services/token.service";
import {Persona} from "../../models/Persona";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  sidenav!: MatSidenav;
  roles: string[];
  isUser = false;
  isLogged = false;
  ocultar = false;
  prueba = [];
  user: string;


  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private observer: BreakpointObserver,
    private tokenService: TokenService,
    private changeDedectionRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.ocultarBar();
    this.mostrarUsername();
    this.changeDedectionRef.detectChanges();
    if (this.tokenService.getToken()) {
      this.isLogged = true;

    } else {
      this.isLogged = false;
    }

    /* this.loginForm = new FormGroup({
       email: new FormControl('', [Validators.required, Validators.email]),
       password: new FormControl('', [Validators.required])
     }); */

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_USER') {
        this.isUser = true;
      }
    });


  }

  onLogOut() {
    this.tokenService.logOut();
    window.location.replace("/");
  }

  onLogIn() {
    window.location.reload();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  ocultarBar() {
    let token = this.tokenService.getAuthorities();
    for (let a of token) {
      if (a == 'ROLE_ADMIN') {
        this.ocultar = true;
      }
    }
  }

  mostrarUsername() {
    this.user = sessionStorage.getItem('USER');
    console.log(this.user)
  }
}
