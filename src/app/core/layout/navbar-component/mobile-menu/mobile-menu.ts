import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../../features/auth/services/auth-service';

interface NavLink {

  label: string;

  path: string;

  icon: string;

  exact: boolean;

}

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.css'
})
export class MobileMenuComponent {

  @Output()
  menuClosed = new EventEmitter<void>();

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  userName = 'Piyush Kumar';

  email = 'piyush@example.com';

  get userInitial(): string {

    return this.userName.charAt(0).toUpperCase();

  }

  readonly navLinks: NavLink[] = [

    {
      label: 'Home',
      path: '/home',
      icon: '🏠',
      exact: true
    },

    {
      label: 'Upload',
      path: '/upload',
      icon: '📤',
      exact: false
    },

    {
      label: 'History',
      path: '/history',
      icon: '📄',
      exact: false
    },

    {
      label: 'About',
      path: '/about',
      icon: 'ℹ️',
      exact: false
    }

  ];

  closeMenu(): void {

    this.menuClosed.emit();

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/auth/login']);

    this.closeMenu();

  }

}