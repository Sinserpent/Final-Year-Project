import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Final-Year-Project';
  currentRoute = ''
  noMarginPages = ['/login',  '/signup']

  constructor(private router: Router){
    this.router.events.subscribe(()=>{
      this.currentRoute = this.router.url
    })
  }

}
