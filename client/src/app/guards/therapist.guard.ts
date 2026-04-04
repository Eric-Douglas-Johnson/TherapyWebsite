import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const therapistGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getRole();
  if (role === 'therapist' || role === 'admin') return true;
  return router.createUrlTree(['/login']);
};
