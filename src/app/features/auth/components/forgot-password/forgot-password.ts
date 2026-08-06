import {
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly toast = inject(ToastService);

  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);

  readonly forgotPasswordForm = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ]

  });

  get email() {

    return this.forgotPasswordForm.controls.email;

  }

  sendOtp(): void {

    if (this.loading()) {
      return;
    }

    if (this.forgotPasswordForm.invalid) {

      this.forgotPasswordForm.markAllAsTouched();

      return;

    }

    const email = this.email.value!.trim();

    this.loading.set(true);

    this.authService

      .forgotPassword({
        email
      })

      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )

      .subscribe({

        next: () => {

          this.loading.set(false);

          // Store email for OTP verification
          localStorage.setItem(
            'resetPasswordEmail',
            email
          );

          this.toast.show(
            'OTP has been sent to your registered email.',
            'success'
          );

          // Navigate to reusable OTP page
          this.router.navigate(
            ['/auth/verify-otp'],
            {
              queryParams: {
                type: 'forgot-password'
              }
            }
          );

        },

        error: (error) => {

          this.loading.set(false);

          this.toast.show(
            error?.error?.message ??
            'Unable to send OTP.',
            'error'
          );

        }

      });

  }

}