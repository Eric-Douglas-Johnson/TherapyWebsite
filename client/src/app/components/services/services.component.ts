import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <h1>Our Services</h1>
      <p>We offer a range of therapeutic services to meet you where you are. Each approach is tailored to your unique situation and goals.</p>
    </section>

    <div class="services-grid">
      <section class="service-card">
        <h2>Individual Therapy</h2>
        <p>One-on-one sessions in a confidential setting where you can explore your thoughts, feelings, and behaviors. Together with your therapist, you'll develop coping strategies, build self-awareness, and work toward personal goals at your own pace.</p>
        <a routerLink="/appointments" [queryParams]="{ service: 'individual' }">Book Individual Session</a>
      </section>

      <section class="service-card">
        <h2>Couples Therapy</h2>
        <p>Strengthen your relationship by improving communication, resolving conflicts, and rebuilding trust. Our therapists provide a neutral, supportive space where both partners can feel heard and work together toward a healthier connection.</p>
        <a routerLink="/appointments" [queryParams]="{ service: 'couples' }">Book Couples Session</a>
      </section>

      <section class="service-card">
        <h2>Family Therapy</h2>
        <p>Address family dynamics, improve communication patterns, and heal relationships between family members. Whether navigating a major transition or longstanding tension, family therapy helps create a more supportive home environment.</p>
        <a routerLink="/appointments" [queryParams]="{ service: 'family' }">Book Family Session</a>
      </section>

      <section class="service-card">
        <h2>Anxiety & Depression</h2>
        <p>Evidence-based treatment for persistent worry, panic, low mood, and loss of motivation. Using approaches like Cognitive Behavioral Therapy (CBT) and mindfulness techniques, we help you regain control and rediscover a sense of stability.</p>
        <a routerLink="/appointments" [queryParams]="{ service: 'anxiety-depression' }">Book a Consultation</a>
      </section>

      <section class="service-card">
        <h2>Trauma & PTSD</h2>
        <p>Specialized care for those who have experienced traumatic events. Using EMDR, somatic experiencing, and trauma-focused CBT, our therapists guide you through processing difficult memories and reducing their hold on your daily life.</p>
        <a routerLink="/appointments" [queryParams]="{ service: 'trauma-ptsd' }">Book a Consultation</a>
      </section>

      <section class="service-card">
        <h2>Grief Counseling</h2>
        <p>Compassionate support for navigating loss — whether the death of a loved one, the end of a relationship, or any significant life change. We help you process grief in a healthy way, honor your experience, and find a path forward.</p>
        <a routerLink="/appointments" [queryParams]="{ service: 'grief' }">Book a Consultation</a>
      </section>
    </div>
  `,
  styles: [`
    :host > section:first-child {
      margin-bottom: 2rem;
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    .service-card {
      display: flex;
      flex-direction: column;
    }
    .service-card h2 {
      margin-bottom: 0.5rem;
    }
    .service-card p {
      flex: 1;
    }
    .service-card a {
      align-self: flex-start;
    }
    @media (max-width: 768px) {
      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ServicesComponent {}
