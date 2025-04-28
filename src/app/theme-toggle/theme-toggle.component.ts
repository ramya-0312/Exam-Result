import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  standalone:false,
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggleTheme()" class="btn">
      <i [class]="themeService.isDarkTheme() ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
    </button>
  `,
  styles: [`
    button {
      border: none;
      background: none;
      font-size: 1.8rem;
      cursor: pointer;
      color: var(--text-color);
    }
  `]
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}
  

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
