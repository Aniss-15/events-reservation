import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(NgToastService); // Inject the toast service

  if (authService.isLogged()) {
    return true;
  } else {
    toastService.danger("please login First","",5000);
    router.navigate(['login']);
    return false;
  }
};


