import {Component, HostListener} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TokenService} from "./services/token.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEndApecs';
  sideBarOpen= true;
  isOpened= true;
  desktopViewWidth: number = 1100;
  sidenav!: MatSidenav;
  ocultar = false;

  constructor(
    private observer: BreakpointObserver,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(){
    this.ocultarBar();
    this.onResize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number){
    this.isOpened = width >= this.desktopViewWidth;
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ocultarBar() {
    let token = this.tokenService.getAuthorities();
    for (let a of token) {
      if (a == 'ROLE_ADMIN') {
        this.ocultar = true;
      }
    }
  }
}
