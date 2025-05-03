import { Component } from '@angular/core';
import { CardComponent } from '../../components/cards/card/card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon'


@Component({
  selector: 'app-landing',
  imports: [CardComponent,CommonModule,RouterLink,MatSlideToggleModule,MatIconModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent  {



cards = [{title: 'Community', content: 'Find Similar minded Induviduals and share your thoughts', icon: 'groups'},
         {title: 'Chat Interviews', content: 'Prepare for text-based interviews with our AI-powered chat system. Engage in realistic, interactive conversations to sharpen your communication skills and boost your confidence.',icon:'chat'},
         {title: 'Custom Interview', content: 'Tailor your interview preparation with personalized sessions using our AI-powered interviewer. Practice face-to-face interviews through your webcam to focus on specific skills and scenarios.',icon:'settings'},
        ]

}
