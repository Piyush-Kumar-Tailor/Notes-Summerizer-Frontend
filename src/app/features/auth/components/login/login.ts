import {
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { finalize } from 'rxjs';

import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly toast = inject(ToastService);

  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);

  readonly hidePassword = signal(true);

  readonly loginForm = this.fb.nonNullable.group({

    email: [

      '',

      [

        Validators.required,

        Validators.email

      ]

    ],

    password: [

      '',

      [

        Validators.required,

        Validators.minLength(8)

      ]

    ]

  });

  togglePassword(): void {

    this.hidePassword.update(value => !value);

  }

  login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.loading.set(true);

    this.authService

      .login(this.loginForm.getRawValue())

      .pipe(

        finalize(() => {

          this.loading.set(false);

        }),

        takeUntilDestroyed(this.destroyRef)

      )

      .subscribe({

        next: () => {

          this.toast.show(

            'Login successful.',

            'success'

          );

          this.router.navigate(['/home']);

        },

        error: () => {

          this.toast.show(

            'Invalid email or password.',

            'error'

          );

        }

      });

  }

}