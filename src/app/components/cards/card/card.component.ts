import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-card',
  imports: [CommonModule,MatIconModule,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone:true
})
export class CardComponent {

  @Input() title!:string
  @Input() content!:string
  @Input() icon?:string='home'
  @Input() route?:string
}
