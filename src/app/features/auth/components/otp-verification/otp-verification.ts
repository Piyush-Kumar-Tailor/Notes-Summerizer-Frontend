import {
  Component,
  DestroyRef,
  ElementRef,
  QueryList,
  ViewChildren,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './otp-verification.html',
  styleUrl: './otp-verification.css'
})
export class OtpVerification {

  private readonly fb = inject(FormBuilder);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  private readonly authService = inject(AuthService);

  private readonly toast = inject(ToastService);

  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);

  readonly verificationType = signal<
    'register' | 'forgot-password'
  >('register');

  readonly email = signal('');

  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor() {

    this.route.queryParams
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(params => {

        const type =
          (params['type'] as 'register' | 'forgot-password')
          ?? 'register';

        this.verificationType.set(type);

        const storageKey =
          type === 'register'
            ? 'verificationEmail'
            : 'resetPasswordEmail';

        this.email.set(
          localStorage.getItem(storageKey) ?? ''
        );

        if (!this.email()) {

          this.router.navigate([

            type === 'register'
              ? '/auth/register'
              : '/auth/forgot-password'

          ]);

        }

      });

  }

  readonly otpForm = this.fb.group({

    otp1: ['', Validators.required],

    otp2: ['', Validators.required],

    otp3: ['', Validators.required],

    otp4: ['', Validators.required],

    otp5: ['', Validators.required],

    otp6: ['', Validators.required]

  });

  get otpControls(): FormControl[] {

    return [

      this.otpForm.controls.otp1 as FormControl,

      this.otpForm.controls.otp2 as FormControl,

      this.otpForm.controls.otp3 as FormControl,

      this.otpForm.controls.otp4 as FormControl,

      this.otpForm.controls.otp5 as FormControl,

      this.otpForm.controls.otp6 as FormControl

    ];

  }

  moveNext(
    event: Event,
    index: number
  ): void {

    const input =
      event.target as HTMLInputElement;

    input.value =
      input.value.replace(/\D/g, '');

    if (!input.value) {
      return;
    }

    this.otpControls[index].setValue(input.value);

    if (index < 5) {

      this.otpInputs
        .get(index + 1)
        ?.nativeElement.focus();

    }

  }

  movePrevious(
    event: KeyboardEvent,
    index: number
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (

      event.key === 'Backspace' &&

      !input.value &&

      index > 0

    ) {

      this.otpInputs
        .get(index - 1)
        ?.nativeElement.focus();

    }

  }

  onPaste(
    event: ClipboardEvent
  ): void {

    event.preventDefault();

    const pastedText =
      event.clipboardData
        ?.getData('text')
        .replace(/\D/g, '')
        .slice(0, 6);

    if (!pastedText) {
      return;
    }

    pastedText
      .split('')
      .forEach((digit, index) => {

        this.otpControls[index]
          .setValue(digit);

      });

    if (pastedText.length === 6) {

      this.otpInputs
        .last
        ?.nativeElement.focus();

    }

  }

  verifyOtp(): void {

    if (this.loading()) {
      return;
    }

    if (this.otpForm.invalid) {

      this.otpForm.markAllAsTouched();

      return;

    }

    const otp = this.otpControls

      .map(control => control.value)

      .join('');

    const request = {

      email: this.email(),

      otp

    };

    this.loading.set(true);

    let request$;
    console.log(request$)
    console.log(request)

    if (this.verificationType() === 'register') {

      request$ =
        this.authService.verifyRegistrationOtp(request);

    } else {

      request$ =
        this.authService.verifyForgotPasswordOtp(request);

    }

    request$

      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )

      .subscribe({

        next: () => {

          this.loading.set(false);

          if (
            this.verificationType() === 'register'
          ) {

            localStorage.removeItem(
              'verificationEmail'
            );

            this.toast.show(
              'Email verified successfully.',
              'success'
            );

            this.router.navigate([
              '/auth/login'
            ]);

          }

          else {

            localStorage.setItem(
              'resetPasswordOtp',
              otp
            );

            this.toast.show(
              'OTP verified successfully.',
              'success'
            );

            this.router.navigate([
              '/auth/reset-password'
            ]);

          }

        },

        error: error => {

          this.loading.set(false);

          this.toast.show(

            error?.error?.message ??

            'Invalid OTP.',

            'error'

          );

        }

      });

  }

  resendOtp(): void {

    if (this.loading()) {
      return;
    }

    this.loading.set(true);

    this.authService

      .resendOtp({

        email: this.email()

      })

      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )

      .subscribe({

        next: () => {

          this.loading.set(false);

          this.toast.show(
            'OTP sent successfully.',
            'success'
          );

        },

        error: error => {

          this.loading.set(false);

          this.toast.show(

            error?.error?.message ??

            'Unable to resend OTP.',

            'error'

          );

        }

      });

  }

  get title(): string {

    return this.verificationType() === 'register'

      ? 'Verify Your Email'

      : 'Verify Reset Password OTP';

  }

  get description(): string {

    return this.verificationType() === 'register'

      ? 'Enter the 6-digit OTP sent to your registered email to activate your account.'

      : 'Enter the 6-digit OTP sent to your registered email to continue resetting your password.';

  }

}