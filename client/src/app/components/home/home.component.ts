import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <h1>Welcome</h1>
      <p>A safe space for healing and growth. We offer compassionate, professional therapy tailored to your needs.</p>
      <a routerLink="/appointments">Book an Appointment</a>
    </section>
  `
})
export class HomeComponent {}
