import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../auth/services/account-service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePasswordComponent {

  private readonly fb = inject(FormBuilder);

  private readonly accountService = inject(AccountService);

  private readonly router = inject(Router);

  readonly loading = signal(false);

  readonly successMessage = signal('');

  readonly errorMessage = signal('');

  showCurrentPassword = false;

  showNewPassword = false;

  showConfirmPassword = false;

  readonly changePasswordForm = this.fb.group({

    currentPassword: [

      '',

      Validators.required

    ],

    newPassword: [

      '',

      [

        Validators.required,

        Validators.minLength(8)

      ]

    ],

    confirmPassword: [

      '',

      Validators.required

    ]

  });

  toggleCurrentPassword(): void {

    this.showCurrentPassword = !this.showCurrentPassword;

  }

  toggleNewPassword(): void {

    this.showNewPassword = !this.showNewPassword;

  }

  toggleConfirmPassword(): void {

    this.showConfirmPassword = !this.showConfirmPassword;

  }

  changePassword(): void {

    this.errorMessage.set('');

    this.successMessage.set('');

    if (this.changePasswordForm.invalid) {

      this.changePasswordForm.markAllAsTouched();

      return;

    }

    const {

      currentPassword,

      newPassword,

      confirmPassword

    } = this.changePasswordForm.getRawValue();

    if (newPassword !== confirmPassword) {

      this.errorMessage.set(

        'New password and confirm password do not match.'

      );

      return;

    }

    this.loading.set(true);

    this.accountService.changePassword({

      currentPassword: currentPassword!,

      newPassword: newPassword!

    }).subscribe({

      next: (response) => {

        this.loading.set(false);

        this.successMessage.set(response);

        this.changePasswordForm.reset();

        this.showCurrentPassword = false;

        this.showNewPassword = false;

        this.showConfirmPassword = false;

      },

      error: (error) => {

        this.loading.set(false);

        this.errorMessage.set(

          error.error || 'Unable to change password.'

        );

      }

    });

  }

}