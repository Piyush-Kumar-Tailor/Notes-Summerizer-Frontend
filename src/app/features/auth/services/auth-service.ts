import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  Observable,
  tap,
  catchError,
  throwError,
  shareReplay,
  finalize
} from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
  ResendOtpRequest,
  RefreshTokenRequest,
  AuthResponse,
  UserResponse
} from '../models/auth-models';

import { TokenService } from './token-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http =
    inject(HttpClient);

  private readonly tokenService =
    inject(TokenService);

  private readonly apiUrl =
    `${environment.apiUrl}/auth`;


  // =====================================================
  // Authentication State
  // =====================================================

  private readonly _isAuthenticated =
    signal(
      this.tokenService.isLoggedIn()
    );

  readonly isAuthenticated =
    this._isAuthenticated.asReadonly();


  // =====================================================
  // Refresh State
  // =====================================================

  /**
   * Stores the currently running refresh request.
   *
   * This prevents multiple API requests from
   * refreshing the token simultaneously.
   */
  private refreshRequest$:
    Observable<AuthResponse> | null = null;


  // =====================================================
  // Register
  // =====================================================

  register(
    request: RegisterRequest
  ): Observable<UserResponse> {

    return this.http

      .post<UserResponse>(
        `${this.apiUrl}/register`,
        request
      )

      .pipe(

        tap(() => {

          localStorage.setItem(
            'verificationEmail',
            request.email
          );

        })

      );

  }


  // =====================================================
  // Verify Registration OTP
  // =====================================================

  verifyRegistrationOtp(
    request: VerifyOtpRequest
  ): Observable<void> {

    return this.http.post<void>(

      `${this.apiUrl}/verify-registration-otp`,

      request

    );

  }


  // =====================================================
  // Resend OTP
  // =====================================================

  resendOtp(
    request: ResendOtpRequest
  ): Observable<void> {

    return this.http.post<void>(

      `${this.apiUrl}/resend-otp`,

      request

    );

  }


  // =====================================================
  // Login
  // =====================================================

  login(
    request: LoginRequest
  ): Observable<AuthResponse> {

    return this.http

      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        request
      )

      .pipe(

        tap(response => {

          this.saveTokens(
            response
          );

        })

      );

  }


  // =====================================================
  // Forgot Password
  // =====================================================

  forgotPassword(
    request: ForgotPasswordRequest
  ): Observable<void> {

    return this.http

      .post<void>(
        `${this.apiUrl}/forgot-password`,
        request
      )

      .pipe(

        tap(() => {

          localStorage.setItem(
            'resetPasswordEmail',
            request.email
          );

        })

      );

  }


  // =====================================================
  // Verify Forgot Password OTP
  // =====================================================

  verifyForgotPasswordOtp(
    request: VerifyOtpRequest
  ): Observable<void> {

    return this.http.post<void>(

      `${this.apiUrl}/verify-forgot-password-otp`,

      request

    );

  }


  // =====================================================
  // Reset Password
  // =====================================================

  resetPassword(
    request: ResetPasswordRequest
  ): Observable<void> {

    return this.http.post<void>(

      `${this.apiUrl}/reset-password`,

      request

    );

  }


  // =====================================================
  // Refresh Access Token
  // =====================================================

  refreshToken(): Observable<AuthResponse> {

    /*
     * IMPORTANT:
     *
     * If another request is already refreshing
     * the token, return the same Observable.
     *
     * This prevents:
     *
     * /refresh-token
     * /refresh-token
     * /refresh-token
     *
     * from being called simultaneously.
     */

    if (this.refreshRequest$) {

      console.log(
        'Refresh already in progress. Waiting...'
      );

      return this.refreshRequest$;

    }


    // ---------------------------------------------------
    // Get Refresh Token
    // ---------------------------------------------------

    const refreshToken =
      this.tokenService.getRefreshToken();


    if (!refreshToken) {

      console.error(
        'No refresh token available.'
      );

      this.logout();

      return throwError(() =>
        new Error(
          'Refresh token not found.'
        )
      );

    }


    // ---------------------------------------------------
    // Request
    // ---------------------------------------------------

    const request: RefreshTokenRequest = {

      refreshToken

    };


    console.log(
      'Refreshing access token...'
    );


    // ---------------------------------------------------
    // Create Refresh Request
    // ---------------------------------------------------

    this.refreshRequest$ = this.http

      .post<AuthResponse>(

        `${this.apiUrl}/refresh-token`,

        request

      )

      .pipe(

        tap(response => {

          console.log(
            'Access token refreshed successfully.'
          );

          /*
           * Save BOTH new tokens.
           */

          this.saveTokens(
            response
          );

        }),


        catchError(error => {

          console.error(
            'Refresh token request failed:',
            error
          );

          /*
           * Refresh token itself is invalid/expired.
           *
           * Now logout the user.
           */

          this.logout();

          return throwError(
            () => error
          );

        }),


        /*
         * After request completes, allow a future
         * refresh request to be created.
         */

        finalize(() => {

          this.refreshRequest$ = null;

        }),


        /*
         * All simultaneous requests receive
         * the same refresh response.
         */

        shareReplay(1)

      );


    return this.refreshRequest$;

  }


  // =====================================================
  // Logout
  // =====================================================

  logout(): void {

    /*
     * Clear authentication tokens.
     */

    this.tokenService.clearTokens();


    /*
     * Clear user-related temporary data.
     */

    localStorage.removeItem(
      'verificationEmail'
    );

    localStorage.removeItem(
      'resetPasswordEmail'
    );

    localStorage.removeItem(
      'resetPasswordOtp'
    );


    /*
     * Update authentication state.
     */

    this._isAuthenticated.set(
      false
    );

  }


  // =====================================================
  // Save Tokens
  // =====================================================

  private saveTokens(
    response: AuthResponse
  ): void {

    if (
      !response.accessToken ||
      !response.refreshToken
    ) {

      throw new Error(
        'Invalid token response from server.'
      );

    }


    this.tokenService.saveTokens(

      response.accessToken,

      response.refreshToken

    );


    this._isAuthenticated.set(
      true
    );

  }

}