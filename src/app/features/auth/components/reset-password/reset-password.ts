import {
  Component,
  DestroyRef,
  computed,
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
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {

  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly toast = inject(ToastService);

  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);

  readonly hidePassword = signal(true);

  readonly hideConfirmPassword = signal(true);

  readonly email = signal(
    localStorage.getItem('resetPasswordEmail') ?? ''
  );

  readonly otp = signal(
    localStorage.getItem('resetPasswordOtp') ?? ''
  );

  constructor() {

    if (!this.email() || !this.otp()) {

      this.toast.show(
        'Please verify OTP first.',
        'error'
      );

      this.router.navigate([
        '/auth/forgot-password'
      ]);

    }

  }

  readonly resetPasswordForm = this.fb.group({

    password: [

      '',

      [

        Validators.required,

        Validators.pattern(

          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

        )

      ]

    ],

    confirmPassword: [

      '',

      Validators.required

    ]

  });

  get password() {

    return this.resetPasswordForm.controls.password;

  }

  get confirmPassword() {

    return this.resetPasswordForm.controls.confirmPassword;

  }

  togglePassword(): void {

    this.hidePassword.update(value => !value);

  }

  toggleConfirmPassword(): void {

    this.hideConfirmPassword.update(value => !value);

  }

  readonly passwordStrength = computed(() => {

    const password = this.password.value ?? '';

    if (password.length < 8) {

      return 'Weak';

    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (regex.test(password)) {

      return 'Strong';

    }

    return 'Medium';

  });

  strengthPercentage(): number {

    switch (this.passwordStrength()) {

      case 'Weak':
        return 30;

      case 'Medium':
        return 65;

      default:
        return 100;

    }

  }

  strengthColor(): string {

    switch (this.passwordStrength()) {

      case 'Weak':
        return 'text-red-500 font-semibold';

      case 'Medium':
        return 'text-yellow-500 font-semibold';

      default:
        return 'text-green-600 font-semibold';

    }

  }

  strengthBarColor(): string {

    switch (this.passwordStrength()) {

      case 'Weak':
        return 'bg-red-500';

      case 'Medium':
        return 'bg-yellow-500';

      default:
        return 'bg-green-500';

    }

  }

  resetPassword(): void {

    if (this.loading()) {

      return;

    }

    if (this.resetPasswordForm.invalid) {

      this.resetPasswordForm.markAllAsTouched();

      return;

    }

    if (this.password.value !== this.confirmPassword.value) {

      this.confirmPassword.setErrors({

        passwordMismatch: true

      });

      return;

    }

    this.loading.set(true);

    this.authService

      .resetPassword({

        email: this.email(),

        otp: this.otp(),

        newPassword: this.password.value!

      })

      .pipe(

        takeUntilDestroyed(this.destroyRef)

      )

      .subscribe({

        next: () => {

          this.loading.set(false);

          localStorage.removeItem(
            'resetPasswordEmail'
          );

          localStorage.removeItem(
            'resetPasswordOtp'
          );

          this.toast.show(

            'Password reset successfully.',

            'success'

          );

          this.router.navigate([
            '/auth/login'
          ]);

        },

        error: (error) => {

          this.loading.set(false);

          this.toast.show(

            error?.error?.message ??

            'Unable to reset password.',

            'error'

          );

        }

      });

  }

}