import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section>
      <h1>Register</h1>
      <form (ngSubmit)="submit()">
        <label>Email<input [(ngModel)]="form.email" name="email" type="email" required /></label>
        <label>Password<input [(ngModel)]="form.password" name="password" type="password" required /></label>
        <label>Confirm Password<input [(ngModel)]="form.confirmPassword" name="confirmPassword" type="password" required /></label>
        @if (errorMsg) { <p class="error">{{ errorMsg }}</p> }
        <button type="submit">Register</button>
      </form>
      <p class="alt-link">Already have an account? <a routerLink="/login">Login</a></p>
    </section>
  `,
  styles: [`
    .error { color: #c0392b; margin: 0; }
    .alt-link { margin-top: 1.5rem; font-size: 0.95rem; }
  `]
})
export class RegisterComponent {
  form = { email: '', password: '', confirmPassword: '' };
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.errorMsg = '';
    if (this.form.password !== this.form.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }
    this.authService.register(this.form.email, this.form.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.errorMsg = err.error?.message || 'Registration failed'
    });
  }
}
