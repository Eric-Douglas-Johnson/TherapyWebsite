import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService, Appointment } from '../../services/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section>
      <h1>Book an Appointment</h1>
      <form (ngSubmit)="submit()">
        <label>Name<input [(ngModel)]="form.name" name="name" required /></label>
        <label>Email<input [(ngModel)]="form.email" name="email" type="email" required /></label>
        <label>Phone<input [(ngModel)]="form.phone" name="phone" /></label>
        <label>Date<input [(ngModel)]="form.date" name="date" type="date" required /></label>
        <label>Message<textarea [(ngModel)]="form.message" name="message"></textarea></label>
        <button type="submit">Submit</button>
      </form>
      <p *ngIf="submitted">Thank you! We will be in touch shortly.</p>
    </section>
  `
})
export class AppointmentsComponent {
  form: Partial<Appointment> = {};
  submitted = false;

  constructor(private appointmentService: AppointmentService) {}

  submit() {
    this.appointmentService.create(this.form as Appointment).subscribe(() => {
      this.submitted = true;
      this.form = {};
    });
  }
}
