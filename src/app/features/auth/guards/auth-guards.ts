import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  CanMatchFn,
  Router
} from '@angular/router';

import { TokenService } from '../services/token-service';

function checkAuthentication() {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  return tokenService.isLoggedIn()
    ? true
    : router.createUrlTree(['/auth/login']);

}

export const authGuard: CanActivateFn = () => {

  return checkAuthentication();

};

export const authChildGuard: CanActivateChildFn = () => {

  return checkAuthentication();

};

export const authMatchGuard: CanMatchFn = () => {

  return checkAuthentication();

};