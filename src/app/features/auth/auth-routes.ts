import { Routes } from '@angular/router';

import { guestGuard } from './guards/guest-guards';

import { LoginComponent } from './components/login/login';

import { RegisterComponent } from './components/register/register';

import { ForgotPassword } from './components/forgot-password/forgot-password';

import { OtpVerification } from './components/otp-verification/otp-verification';

import { ResetPassword } from './components/reset-password/reset-password';

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [guestGuard]
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
        canActivate: [guestGuard]
      },
      {
        path: 'verify-otp',
        component: OtpVerification,
        canActivate: [guestGuard]
      },
      {
        path: 'reset-password',
        component: ResetPassword,
        canActivate: [guestGuard]
      }
    ]
  }
];