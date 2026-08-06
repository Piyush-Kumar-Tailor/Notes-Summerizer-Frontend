import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { UserService } from '../services/user.service';
import { UserProfile } from '../models/user-profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {

  private readonly userService = inject(UserService);

  readonly user = signal<UserProfile | null>(null);

  readonly loading = signal(true);

  readonly error = signal('');

  readonly userInitial = computed(() => {

    const profile = this.user();

    return profile
      ? profile.fullName.charAt(0).toUpperCase()
      : '?';

  });

  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile(): void {

    this.loading.set(true);

    this.userService.getCurrentUser().subscribe({

      next: profile => {

        this.user.set(profile);

        this.loading.set(false);

      },

      error: () => {

        this.error.set('Unable to load profile.');

        this.loading.set(false);

      }

    });

  }

}