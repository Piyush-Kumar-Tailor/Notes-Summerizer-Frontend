import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import {
  catchError,
  throwError
} from 'rxjs';

import { TokenService } from './services/token-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);

  const token = tokenService.getAccessToken();

  const publicEndpoints = [

    '/login',

    '/register',

    '/forgot-password',

    '/verify-otp',

    '/reset-password',

    '/refresh-token'

  ];

  const isPublicRequest = publicEndpoints.some(endpoint =>
    req.url.includes(endpoint)
  );

  if (isPublicRequest || !token) {

    return next(req);

  }

  const authenticatedRequest = req.clone({

    setHeaders: {

      Authorization: `Bearer ${token}`

    }

  });

  return next(authenticatedRequest).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {

        tokenService.clearTokens();

        window.location.href = '/login';

      }

      return throwError(() => error);

    })

  );

};