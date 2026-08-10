import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  throwError
} from 'rxjs';

import { TokenService } from './services/token-service';
import { AuthService } from './services/auth-service';


// =====================================================
// Refresh State
// =====================================================

let isRefreshing = false;

const refreshTokenSubject =
  new BehaviorSubject<string | null>(null);


// =====================================================
// Auth Interceptor
// =====================================================

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

    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/forgot-password',
    '/api/auth/verify-registration-otp',
    '/api/auth/verify-forgot-password-otp',
    '/api/auth/resend-otp',
    '/api/auth/reset-password',
    '/api/auth/refresh-token'

  ];


  const isPublicRequest =
    publicEndpoints.some(endpoint =>
      req.url.includes(endpoint)
    );


  // =====================================================
  // Public Request
  // =====================================================

  if (isPublicRequest) {

    return next(req);

  }


  // =====================================================
  // Access Token
  // =====================================================

  const accessToken =
    tokenService.getAccessToken();


  // =====================================================
  // No Token
  // =====================================================

  if (!accessToken) {

    return next(req);

  }


  // =====================================================
  // Attach Access Token
  // =====================================================

  const authenticatedRequest =
    req.clone({

      setHeaders: {

        Authorization:
          `Bearer ${accessToken}`

      }

    });


  // =====================================================
  // Request
  // =====================================================

  return next(authenticatedRequest)

    .pipe(

      catchError(
        (error: HttpErrorResponse) => {


          // =============================================
          // Only refresh on 401
          // =============================================

          if (error.status !== 401) {

            return throwError(
              () => error
            );

          }


          console.warn(
            'Access token expired/invalid.'
          );


          // =============================================
          // Refresh already running
          // =============================================

          if (isRefreshing) {

            console.log(
              'Waiting for existing token refresh...'
            );


            return refreshTokenSubject

              .pipe(

                filter(
                  token => token !== null
                ),

                take(1),

                switchMap(
                  newAccessToken => {

                    const retryRequest =
                      req.clone({

                        setHeaders: {

                          Authorization:
                            `Bearer ${newAccessToken}`

                        }

                      });


                    return next(
                      retryRequest
                    );

                  }

                )

              );

          }


          // =============================================
          // Start Refresh
          // =============================================

          isRefreshing = true;

          refreshTokenSubject.next(null);


          console.log(
            'Starting refresh token request...'
          );


          return authService

            .refreshToken()

            .pipe(

              switchMap(
                response => {


                  // -------------------------------------
                  // Validate response
                  // -------------------------------------

                  const newAccessToken =
                    response?.accessToken;


                  if (!newAccessToken) {

                    throw new Error(
                      'No access token returned by refresh endpoint.'
                    );

                  }


                  console.log(
                    'New access token received.'
                  );


                  // -------------------------------------
                  // Notify waiting requests
                  // -------------------------------------

                  refreshTokenSubject.next(
                    newAccessToken
                  );


                  // -------------------------------------
                  // Retry original request
                  // -------------------------------------

                  const retryRequest =
                    req.clone({

                      setHeaders: {

                        Authorization:
                          `Bearer ${newAccessToken}`

                      }

                    });


                  return next(
                    retryRequest
                  );

                }

              ),

              catchError(
                refreshError => {

                  console.error(
                    'Refresh token failed:',
                    refreshError
                  );


                  refreshTokenSubject.next(null);


                  authService.logout();


                  router.navigate([
                    '/auth/login'
                  ]);


                  return throwError(
                    () => refreshError
                  );

                }

              ),

              finalize(() => {

                isRefreshing = false;

              })

            );

        }

      )

    );

};