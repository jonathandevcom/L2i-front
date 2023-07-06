import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d+\-!?]{8,}$/;
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    if(password === undefined){
      return null;
    }
    if (!passwordRegex.test(password)) {
      return { passwordInvalid: true };
    }
    return null;
  };
}

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;
    if (password !== confirmPassword) {
      return { passwordNotMatch: true };
    }
    return null;
  };
}
