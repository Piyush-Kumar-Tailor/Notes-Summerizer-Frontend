import {
  Injectable,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private static readonly ACCESS_TOKEN_KEY = 'access_token';

  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  private readonly platformId = inject(PLATFORM_ID);

  private get browser(): boolean {

    return isPlatformBrowser(this.platformId);

  }

  // ==========================================
  // Save Tokens
  // ==========================================

  saveTokens(
    accessToken: string,
    refreshToken: string
  ): void {

    if (!this.browser) {
      return;
    }

    localStorage.setItem(
      TokenService.ACCESS_TOKEN_KEY,
      accessToken
    );

    localStorage.setItem(
      TokenService.REFRESH_TOKEN_KEY,
      refreshToken
    );

  }

  // ==========================================
  // Access Token
  // ==========================================

  getAccessToken(): string | null {

    if (!this.browser) {
      return null;
    }

    return localStorage.getItem(
      TokenService.ACCESS_TOKEN_KEY
    );

  }

  setAccessToken(
    token: string
  ): void {

    if (!this.browser) {
      return;
    }

    localStorage.setItem(
      TokenService.ACCESS_TOKEN_KEY,
      token
    );

  }

  // ==========================================
  // Refresh Token
  // ==========================================

  getRefreshToken(): string | null {

    if (!this.browser) {
      return null;
    }

    return localStorage.getItem(
      TokenService.REFRESH_TOKEN_KEY
    );

  }

  setRefreshToken(
    token: string
  ): void {

    if (!this.browser) {
      return;
    }

    localStorage.setItem(
      TokenService.REFRESH_TOKEN_KEY,
      token
    );

  }

  // ==========================================
  // Authentication Status
  // ==========================================

  hasAccessToken(): boolean {

    return this.getAccessToken() !== null;

  }

  hasRefreshToken(): boolean {

    return this.getRefreshToken() !== null;

  }

  isLoggedIn(): boolean {

    return this.hasAccessToken();

  }

  // ==========================================
  // Update Tokens
  // ==========================================

  updateTokens(
    accessToken: string,
    refreshToken: string
  ): void {

    this.setAccessToken(accessToken);

    this.setRefreshToken(refreshToken);

  }

  // ==========================================
  // Clear Tokens
  // ==========================================

  clearTokens(): void {

    if (!this.browser) {
      return;
    }

    localStorage.removeItem(
      TokenService.ACCESS_TOKEN_KEY
    );

    localStorage.removeItem(
      TokenService.REFRESH_TOKEN_KEY
    );

  }

}