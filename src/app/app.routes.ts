import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout-component/main-layout-component';

import { HomeComponent } from './features/home-component/home-component';
import { AboutComponent } from './features/about-component/about-component';
import { UploadComponent } from './features/upload-component/upload-component';
import { HistoryComponent } from './features/history-component/history-component';
import { SummaryComponent } from './features/summary-component/summary-component';
import { ProfileComponent } from './features/profile/profile/profile';
import { ChangePasswordComponent } from './features/profile/change-password/change-password';
import { NotFoundComponent } from './features/not-found-component/not-found-component';

import {
  authGuard,
  authChildGuard
} from './features/auth/guards/auth-guards';

import { guestGuard } from './features/auth/guards/guest-guards';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // Guest Routes (Login/Register)
  {
    path: '',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./features/auth/auth-routes')
        .then(m => m.AUTH_ROUTES)
  },

  // Protected Routes
  {
    path: '',
    component: MainLayoutComponent,

    canMatch: [authGuard],
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],

    children: [

      {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
      },

      {
        path: 'about',
        component: AboutComponent,
        title: 'About'
      },

      {
        path: 'upload',
        component: UploadComponent,
        title: 'Upload PDF'
      },

      {
        path: 'history',
        component: HistoryComponent,
        title: 'Summary History'
      },

      {
        path: 'summary/:id',
        component: SummaryComponent,
        title: 'AI Summary'
      },

      {
        path: 'profile',
        component: ProfileComponent,
        title: 'My Profile'
      },

      {
        path: 'profile/change-password',
        component: ChangePasswordComponent,
        title: 'Change Password'
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }

    ]

  },

  // 404
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 | Page Not Found'
  }

];