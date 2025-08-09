import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true
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
