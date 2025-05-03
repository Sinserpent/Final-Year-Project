import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebartoggleService } from '../../services/sidebartoggle.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule,RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  animations: [
    trigger('openClose',[
      state('closed',style({transform: 'translateX(120%)'})),
      state('open',style({transform: 'translateX(0)'})),
      transition('closed <=> open',[animate('0.5s ease-in')])
    ])
  ]
})
export class SideBarComponent {
  protected menuState: 'open' | 'closed' = 'closed'
  isActive = false

  constructor(private st:SidebartoggleService){
    this.st.setState(false)
    this.st.isActive$.subscribe(state => {
      this.isActive = state
    })
  }

  toggle(){
    this.st.toggle()
  }
}
