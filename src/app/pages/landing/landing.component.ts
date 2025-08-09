import { Component } from '@angular/core';
import { CardComponent } from '../../components/cards/card/card.component';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon'


@Component({
  selector: 'app-landing',
  imports: [CardComponent,CommonModule,MatSlideToggleModule,MatIconModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent  {



cards = [
         {title: 'Resume Analysis', content: 'Check to see if your resume can be made better. And after that do a interview tailored for you',icon:'chat', route:'questionform'},
         
        ]

}

//{title: 'Community', content: 'Find Similar minded Induviduals and share your thoughts', icon: 'groups'},
