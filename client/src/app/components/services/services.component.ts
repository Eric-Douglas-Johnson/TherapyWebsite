import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section>
      <h1>Services</h1>
      <ul>
        <li>Individual Therapy</li>
        <li>Couples Therapy</li>
        <li>Family Therapy</li>
        <li>Anxiety & Depression</li>
        <li>Trauma & PTSD</li>
        <li>Grief Counseling</li>
      </ul>
    </section>
  `
})
export class ServicesComponent {}
