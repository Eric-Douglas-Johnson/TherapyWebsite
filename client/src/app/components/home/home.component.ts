import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-image-placeholder">
        <span>Hero Image</span>
      </div>
      <div class="hero-content">
        <h1>Welcome</h1>
        <p>A safe space for healing and growth. We offer compassionate, professional therapy tailored to your needs.</p>
        <a routerLink="/appointments">Book an Appointment</a>
      </div>
    </section>

    <section class="features">
      <div class="feature-card">
        <div class="feature-image-placeholder"><span>Image</span></div>
        <h2>Individual Therapy</h2>
        <p>One-on-one sessions tailored to your personal journey.</p>
      </div>
      <div class="feature-card">
        <div class="feature-image-placeholder"><span>Image</span></div>
        <h2>Couples Therapy</h2>
        <p>Strengthen your relationship with guided support.</p>
      </div>
      <div class="feature-card">
        <div class="feature-image-placeholder"><span>Image</span></div>
        <h2>Family Therapy</h2>
        <p>Build healthier family dynamics together.</p>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      display: flex;
      gap: 2.5rem;
      align-items: center;
      margin-bottom: 2.5rem;
    }
    .hero-image-placeholder {
      min-width: 320px;
      height: 260px;
      background: #e0d8cf;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #998a7a;
      font-size: 1.2rem;
      font-family: Georgia, serif;
    }
    .hero-content {
      flex: 1;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      padding: 2rem;
    }
    .feature-card {
      text-align: center;
    }
    .feature-image-placeholder {
      width: 100%;
      height: 180px;
      background: #e0d8cf;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #998a7a;
      font-size: 1rem;
      font-family: Georgia, serif;
      margin-bottom: 1rem;
    }
    .feature-card h2 {
      font-size: 1.15rem;
      margin-bottom: 0.4rem;
    }
    .feature-card p {
      font-size: 0.95rem;
    }
    @media (max-width: 768px) {
      .hero {
        flex-direction: column;
      }
      .hero-image-placeholder {
        min-width: 100%;
        height: 200px;
      }
      .features {
        grid-template-columns: 1fr;
        padding: 1.5rem;
      }
    }
  `]
})
export class HomeComponent {}
