import {
  Component,
  EventEmitter,
  Output,
  inject,
  computed,
  signal
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../../../features/auth/services/auth-service';
import { UserService } from '../../../../features/profile/services/user.service';
import { UserProfile } from '../../../../features/profile/models/user-profile';

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

  // =====================================================
  // Output
  // =====================================================

  @Output()
  menuClosed =
    new EventEmitter<void>();


  // =====================================================
  // Services
  // =====================================================

  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);

  private readonly userService =
    inject(UserService);


  // =====================================================
  // User State
  // =====================================================

  readonly user =
    signal<UserProfile | null>(null);


  // =====================================================
  // User Name
  // =====================================================

  readonly userName = computed(() => {

    return this.user()?.fullName ??
      'User';

  });


  // =====================================================
  // User Email
  // =====================================================

  readonly email = computed(() => {

    return this.user()?.email ??
      '';

  });


  // =====================================================
  // User Initial
  // =====================================================

  readonly userInitial = computed(() => {

    return this.userName()
      .charAt(0)
      .toUpperCase();

  });


  // =====================================================
  // Navigation
  // =====================================================

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


  // =====================================================
  // Initialization
  // =====================================================



  // =====================================================
  // Load Current User
  // =====================================================

  constructor() {
    this.loadCurrentUser();

  }
  
  private loadCurrentUser(): void {

    this.userService
      .getCurrentUser()
      .subscribe({

        next: profile => {

          this.user.set(profile);

        },

        error: error => {

          console.error(
            'Failed to load current user:',
            error
          );

        }

      });

  }


  // =====================================================
  // Close Menu
  // =====================================================

  closeMenu(): void {

    this.menuClosed.emit();

  }


  // =====================================================
  // Logout
  // =====================================================

  logout(): void {

    this.authService.logout();

    this.router.navigate([
      '/auth/login'
    ]);

    this.closeMenu();

  }

}