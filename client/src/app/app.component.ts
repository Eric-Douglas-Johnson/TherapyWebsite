import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About</a>
      <a routerLink="/services">Services</a>
      <a routerLink="/appointments">Appointments</a>
    </nav>
    <main>
      <router-outlet />
    </main>
  `
})
export class AppComponent {}
