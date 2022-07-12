import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from 'src/app/interfaces/IMenu';
import {SidebarService} from "../../services/sidebar.service";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuList!: Observable<IMenu[]>;
  sidenav!: MatSidenav;



  constructor(
    public sidebarService: SidebarService,
    private observer: BreakpointObserver
  ) {

  }

  ngOnInit(): void {
    this.menuList = this.sidebarService.getList<IMenu>("/assets/menu.json")
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


}
