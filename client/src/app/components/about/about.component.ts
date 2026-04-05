import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section>
      <h1>About Us</h1>
      <p>We are a licensed team of therapists dedicated to supporting individuals, couples, and families through life's challenges.</p>
    </section>

    <section class="team">
      <h2>Meet Our Therapists</h2>
      <div class="therapist-grid">
        <div class="therapist-card">
          <div class="therapist-photo"><span>Photo</span></div>
          <h3>Dr. Jane Smith</h3>
          <p class="title">Licensed Clinical Psychologist</p>
          <p>Specializing in anxiety, depression, and trauma recovery with over 15 years of experience.</p>
        </div>
        <div class="therapist-card">
          <div class="therapist-photo"><span>Photo</span></div>
          <h3>Dr. Michael Chen</h3>
          <p class="title">Marriage & Family Therapist</p>
          <p>Helping couples and families build stronger, healthier relationships.</p>
        </div>
        <div class="therapist-card">
          <div class="therapist-photo"><span>Photo</span></div>
          <h3>Dr. Sarah Williams</h3>
          <p class="title">Licensed Clinical Social Worker</p>
          <p>Focused on grief counseling and life transitions with a compassionate approach.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      margin-bottom: 2rem;
    }
    .team {
      padding: 2.5rem;
    }
    .team h2 {
      text-align: center;
      margin-bottom: 2rem;
    }
    .therapist-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    .therapist-card {
      text-align: center;
    }
    .therapist-photo {
      width: 160px;
      height: 160px;
      background: #e0d8cf;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #998a7a;
      font-size: 1rem;
      font-family: Georgia, serif;
      margin: 0 auto 1rem;
    }
    .therapist-card h3 {
      color: #2f5c51;
      font-size: 1.15rem;
      font-weight: normal;
      margin-bottom: 0.25rem;
    }
    .therapist-card .title {
      color: #4a7c6f;
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: 0.75rem;
    }
    .therapist-card p:last-child {
      font-size: 0.95rem;
    }
    @media (max-width: 768px) {
      .therapist-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      .team {
        padding: 1.8rem;
      }
    }
  `]
})
export class AboutComponent {}
