import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export class AuthValidators {

    /**
     * Password Strength
     */
    static passwordStrength(): ValidatorFn {

        return (
            control: AbstractControl
        ): ValidationErrors | null => {

            const value = control.value;

            if (!value) {
                return null;
            }

            const hasUpperCase = /[A-Z]/.test(value);

            const hasLowerCase = /[a-z]/.test(value);

            const hasNumber = /\d/.test(value);

            const hasSpecialCharacter =
                /[!@#$%^&*(),.?":{}|<>]/.test(value);

            const valid =
                hasUpperCase &&
                hasLowerCase &&
                hasNumber &&
                hasSpecialCharacter;

            return valid
                ? null
                : {
                    passwordStrength: true
                };

        };

    }

    static passwordsMatch(
        passwordField: string,
        confirmPasswordField: string
    ): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {

            const password =
                control.get(passwordField)?.value;

            const confirmPassword =
                control.get(confirmPasswordField)?.value;

            if (password !== confirmPassword) {

                control.get(confirmPasswordField)?.setErrors({
                    passwordMismatch: true
                });

                return {
                    passwordMismatch: true
                };

            }

            return null;

        };

    }

}