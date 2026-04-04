import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section>
      <h1>Login</h1>
      <form (ngSubmit)="submit()">
        <label>Email<input [(ngModel)]="form.email" name="email" type="email" required /></label>
        <label>Password<input [(ngModel)]="form.password" name="password" type="password" required /></label>
        @if (errorMsg) { <p class="error">{{ errorMsg }}</p> }
        <button type="submit">Login</button>
      </form>
      <p class="alt-link">Don't have an account? <a routerLink="/register">Register</a></p>
    </section>
  `,
  styles: [`
    .error { color: #c0392b; margin: 0; }
    .alt-link { margin-top: 1.5rem; font-size: 0.95rem; }
  `]
})
export class LoginComponent {
  form = { email: '', password: '' };
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.errorMsg = '';
    this.authService.login(this.form.email, this.form.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.errorMsg = err.error?.message || 'Login failed'
    });
  }
}
