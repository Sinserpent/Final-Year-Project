import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebartoggleService } from '../../services/sidebartoggle.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private st:SidebartoggleService){}

  toggle(){
    this.st.toggle()


  }
}
