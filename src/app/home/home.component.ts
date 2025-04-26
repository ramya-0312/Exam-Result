import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  standalone:false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private themeService: ThemeService) { }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
