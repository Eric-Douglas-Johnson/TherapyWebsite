import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
  { path: 'services', loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent) },
  { path: 'appointments', canActivate: [authGuard], loadComponent: () => import('./components/appointments/appointments.component').then(m => m.AppointmentsComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: '**', redirectTo: '' }
];
