import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d+\-!?]{8,}$/;
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    if (!passwordRegex.test(password)) {
      return { passwordInvalid: true };
    }
    return null;
  };
}
