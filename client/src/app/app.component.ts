import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  template: `
    <nav>
      <a routerLink="/" class="logo" (click)="menuOpen = false">
        <div class="logo-placeholder">LOGO</div>
      </a>
      <button class="menu-toggle" (click)="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="nav-links" [class.open]="menuOpen">
        <a routerLink="/" (click)="menuOpen = false">Home</a>
        <a routerLink="/about" (click)="menuOpen = false">About</a>
        <a routerLink="/services" (click)="menuOpen = false">Services</a>
        <a routerLink="/appointments" (click)="menuOpen = false">Appointments</a>
        @if (isLoggedIn$ | async) {
          <a href="#" (click)="$event.preventDefault(); menuOpen = false; logout()">Logout</a>
        } @else {
          <a routerLink="/login" (click)="menuOpen = false">Login</a>
          <a routerLink="/register" (click)="menuOpen = false">Register</a>
        }
      </div>
    </nav>
    <main>
      <router-outlet />
    </main>
  `
})
export class AppComponent {
  isLoggedIn$;
  menuOpen = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
