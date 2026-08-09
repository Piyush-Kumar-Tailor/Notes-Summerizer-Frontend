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


export const authInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  const tokenService =
    inject(TokenService);

  const authService =
    inject(AuthService);

  const router =
    inject(Router);


  // =====================================================
  // Public Endpoints
  // =====================================================

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


  // =====================================================
  // Check Public Request
  // =====================================================

  const isPublicRequest =
    publicEndpoints.some(endpoint =>
      req.url.includes(endpoint)
    );


  /*
   * Never attach authentication to public
   * endpoints.
   *
   * Especially /refresh-token.
   */

  if (isPublicRequest) {

    return next(req);

  }


  // =====================================================
  // Get Access Token
  // =====================================================

  const accessToken =
    tokenService.getAccessToken();


  /*
   * No access token.
   *
   * Let the request continue.
   *
   * The backend can return 401 if authentication
   * is required.
   */

  if (!accessToken) {

    return next(req);

  }


  // =====================================================
  // Add Authorization Header
  // =====================================================

  const authenticatedRequest =
    req.clone({

      setHeaders: {

        Authorization:
          `Bearer ${accessToken}`

      }

    });


  // =====================================================
  // Send Request
  // =====================================================

  return next(
    authenticatedRequest
  )

    .pipe(

      catchError(
        (error: HttpErrorResponse) => {


          // =============================================
          // Only Handle Unauthorized
          // =============================================

          if (error.status !== 401) {

            return throwError(
              () => error
            );

          }


          console.log(
            'Access token expired/invalid.'
          );

          console.log(
            'Attempting token refresh...'
          );


          // =============================================
          // Refresh Token
          // =============================================

          return authService

            .refreshToken()

            .pipe(

              switchMap(
                response => {


                  // -------------------------------------
                  // Get New Access Token
                  // -------------------------------------

                  const newAccessToken =
                    response.accessToken;


                  if (!newAccessToken) {

                    console.error(
                      'No new access token received.'
                    );


                    authService.logout();

                    router.navigate([
                      '/auth/login'
                    ]);


                    return throwError(
                      () =>
                        new Error(
                          'No access token returned.'
                        )
                    );

                  }


                  // -------------------------------------
                  // Retry Original Request
                  // -------------------------------------

                  const retryRequest =
                    req.clone({

                      setHeaders: {

                        Authorization:
                          `Bearer ${newAccessToken}`

                      }

                    });


                  console.log(
                    'Retrying original request with new token...'
                  );


                  return next(
                    retryRequest
                  );

                }

              ),


              // =========================================
              // Refresh Failed
              // =========================================

              catchError(
                refreshError => {

                  console.error(
                    'Unable to refresh access token:',
                    refreshError
                  );


                  /*
                   * Refresh token is no longer valid.
                   *
                   * NOW logout.
                   */

                  authService.logout();


                  router.navigate([
                    '/auth/login'
                  ]);


                  return throwError(
                    () => refreshError
                  );

                }

              )

            );

        }

      )

    );

};