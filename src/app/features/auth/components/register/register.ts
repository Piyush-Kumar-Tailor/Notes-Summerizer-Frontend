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

import { finalize } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthValidators } from '../../validators/auth-validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly toast = inject(ToastService);

  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);

  readonly hidePassword = signal(true);

  readonly hideConfirmPassword = signal(true);

  readonly registerForm = this.fb.nonNullable.group(
    {

      firstName: [
        '',
        [
          Validators.required
        ]
      ],

      lastName: [
        '',
        [
          Validators.required
        ]
      ],

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
          Validators.minLength(8),
          AuthValidators.passwordStrength()
        ]
      ],

      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ],

      acceptTerms: [
        false,
        Validators.requiredTrue
      ]

    },
    {
      validators: AuthValidators.passwordsMatch(
        'password',
        'confirmPassword'
      )
    }
  );

  togglePassword(): void {

    this.hidePassword.update(value => !value);

  }

  toggleConfirmPassword(): void {

    this.hideConfirmPassword.update(value => !value);

  }

  register(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }

    this.loading.set(true);
    console.log("Rgister Starting .....")

    const {
      acceptTerms,
      ...request
    } = this.registerForm.getRawValue();

    this.authService
      .register(request)
      .pipe(
        finalize(() => {

          this.loading.set(false);

        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: () => {

          // Save email for OTP verification
          localStorage.setItem(
            'verificationEmail',
            request.email
          );

          this.toast.show(
            'Registration successful. Please verify your email.',
            'success'
          );

          this.router.navigate(
            ['/auth/verify-otp'],
            {
              queryParams: {
                type: 'register'
              }
            }
          );

        },

        error: (error) => {

          this.toast.show(

            error?.error?.message ??
            'Registration failed.',

            'error'

          );

        }

      });

  }

}