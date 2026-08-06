import { Injectable, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  Observable,
  tap,
  catchError,
  throwError
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

  private readonly http = inject(HttpClient);

  private readonly tokenService = inject(TokenService);

  private readonly apiUrl =
    `${environment.apiUrl}/auth`;

  /**
   * Authentication State
   */
  private readonly _isAuthenticated = signal(
    this.tokenService.isLoggedIn()
  );

  readonly isAuthenticated =
    this._isAuthenticated.asReadonly();

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

          this.saveTokens(response);

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
  // Refresh Token
  // =====================================================

  refreshToken(): Observable<AuthResponse> {

    const refreshToken =
      this.tokenService.getRefreshToken();

    if (!refreshToken) {

      this.logout();

      return throwError(() =>
        new Error('Refresh token not found.')
      );

    }

    const request: RefreshTokenRequest = {

      refreshToken

    };

    return this.http

      .post<AuthResponse>(

        `${this.apiUrl}/refresh-token`,

        request

      )

      .pipe(

        tap(response => {

          this.saveTokens(response);

        }),

        catchError(error => {

          this.logout();

          return throwError(() => error);

        })

      );

  }

  // =====================================================
  // Logout
  // =====================================================

  logout(): void {

    this.tokenService.clearTokens();

    localStorage.removeItem(
      'verificationEmail'
    );

    localStorage.removeItem(
      'resetPasswordEmail'
    );

    localStorage.removeItem(
      'resetPasswordOtp'
    );

    this._isAuthenticated.set(false);

  }

  // =====================================================
  // Save Tokens
  // =====================================================

  private saveTokens(
    response: AuthResponse
  ): void {

    this.tokenService.saveTokens(

      response.accessToken,

      response.refreshToken

    );

    this._isAuthenticated.set(true);

  }

}