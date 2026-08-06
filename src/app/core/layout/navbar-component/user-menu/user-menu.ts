import {
  Component,
  inject,
  OnInit,
  signal,
  computed
} from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../features/auth/services/auth-service';
import { UserService } from '../../../../features/profile/services/user.service';
import { UserProfile } from '../../../../features/profile/models/user-profile';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css'
})
export class UserMenuComponent implements OnInit {

  private readonly router = inject(Router);

  private readonly authService = inject(AuthService);

  private readonly userService = inject(UserService);

  readonly isOpen = signal(false);

  readonly loading = signal(true);

  readonly user = signal<UserProfile | null>(null);

  readonly userInitial = computed(() => {

    const profile = this.user();

    return profile
      ? profile.fullName.charAt(0).toUpperCase()
      : '?';

  });

  ngOnInit(): void {

    this.loadCurrentUser();

  }

  private loadCurrentUser(): void {

    this.loading.set(true);

    this.userService.getCurrentUser().subscribe({

      next: (profile) => {

        this.user.set(profile);

        this.loading.set(false);

      },

      error: () => {

        this.loading.set(false);

      }

    });

  }

  toggleMenu(): void {

    this.isOpen.update(open => !open);

  }

  closeMenu(): void {

    this.isOpen.set(false);

  }

  logout(): void {

    this.authService.logout();

    this.closeMenu();

    this.router.navigate(['/auth/login']);

  }

}