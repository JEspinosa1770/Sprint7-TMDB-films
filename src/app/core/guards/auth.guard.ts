import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { UserService } from '../services/user-service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(UserService);
  const router = inject(Router);

  if (authService.currentUser()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
