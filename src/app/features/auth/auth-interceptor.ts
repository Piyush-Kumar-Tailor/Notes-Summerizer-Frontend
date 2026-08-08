import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  catchError,
  switchMap,
  throwError
} from 'rxjs';

import { TokenService } from './services/token-service';
import { AuthService } from './services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);

  const authService = inject(AuthService);

  const router = inject(Router);

  const token = tokenService.getAccessToken();

  const publicEndpoints = [

    '/login',

    '/register',

    '/forgot-password',

    '/verify-registration-otp',

    '/verify-forgot-password-otp',

    '/resend-otp',

    '/reset-password',

    '/refresh-token'

  ];

  const isPublicRequest = publicEndpoints.some(endpoint =>
    req.url.includes(endpoint)
  );

  /*
   * Public request
   */
  if (isPublicRequest) {

    return next(req);

  }

  /*
   * No access token
   */
  if (!token) {

    return next(req);

  }

  /*
   * Attach access token
   */
  const authenticatedRequest = req.clone({

    setHeaders: {

      Authorization: `Bearer ${token}`

    }

  });

  return next(authenticatedRequest).pipe(

    catchError((error: HttpErrorResponse) => {

      /*
       * Access token expired
       */
      if (error.status === 401) {

        console.log(
          'Access token expired. Attempting refresh...'
        );

        return authService.refreshToken().pipe(

          switchMap(() => {

            const newAccessToken =
              tokenService.getAccessToken();

            /*
             * Refresh succeeded but no new token
             */
            if (!newAccessToken) {

              authService.logout();

              router.navigate(['/auth/login']);

              return throwError(() =>
                new Error(
                  'Access token refresh failed.'
                )
              );

            }

            /*
             * Retry original request
             */
            const retryRequest = req.clone({

              setHeaders: {

                Authorization:
                  `Bearer ${newAccessToken}`

              }

            });

            console.log(
              'Access token refreshed. Retrying request...'
            );

            return next(retryRequest);

          }),

          /*
           * Refresh token also failed
           */
          catchError(refreshError => {

            console.error(
              'Refresh token failed:',
              refreshError
            );

            authService.logout();

            router.navigate(['/auth/login']);

            return throwError(() =>
              refreshError
            );

          })

        );

      }

      return throwError(() => error);

    })

  );

};