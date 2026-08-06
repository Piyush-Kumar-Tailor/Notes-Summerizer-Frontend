export interface LoginRequest {

  email: string;

  password: string;

}

export interface RegisterRequest {

  firstName: string;

  lastName: string;

  email: string;

  password: string;

  confirmPassword: string;

}

export interface User {

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  role: 'USER' | 'ADMIN';

  profileImage?: string;

}

export interface AuthResponse {

  accessToken: string;

  refreshToken: string;

  expiresIn: number;

  user: User;

}

export interface UserResponse {

  id: number;

  firstName: string;

  lastName: string;

  email: string;

}

export interface ForgotPasswordRequest {

  email: string;

}

export interface VerifyOtpRequest {

  email: string;

  otp: string;

}

export interface ResetPasswordRequest {

  email: string;

  otp: string;

  newPassword: string;

}

export interface ChangePasswordRequest {

  currentPassword: string;

  newPassword: string;

}

export interface ResendOtpRequest {

  email: string;

}

export interface RefreshTokenRequest {

  refreshToken: string;

}