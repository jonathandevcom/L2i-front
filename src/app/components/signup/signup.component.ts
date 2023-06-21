import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private us:UserService,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      civility: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      addressComplement: [''],
      zipCode: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: ['', [Validators.required, this.matchPasswordValidator()]],
    });
  }

  onSubmit() {
    let message: string = '';
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const user = JSON.stringify(this.registerForm.value).replace(/,/g, ';');

    this.us.postNewUser(user).subscribe((res:any) => {
      if (!res.result.login) {
        localStorage.setItem('login', 'false');
        this.authService.setIsLogged(false);
        message = res.result.error;
      }
      if (res.result.login) {
        localStorage.setItem('login', 'true');
        localStorage.setItem('type', 'user');
        localStorage.setItem('userID', res.result.userID);

        this.authService.setIsLogged(true);
        message = res.result.message;
        this.router.navigate(['/home']);
      }

      const alertElement = document.getElementById('cart-alert');

      if (alertElement) {
        alertElement.innerHTML = message;
        alertElement.style.display = 'block';

        setTimeout(function() {
          alertElement.style.display = 'none';
        }, 3000);
      }
    });
  }

  passwordValidator(): ValidatorFn {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d+\-!?]{8,}$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      if (!passwordRegex.test(password)) {
        return { passwordInvalid: true };
      }
      return null;
    };
  }

  matchPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.parent?.get('password')?.value;
      const confirmPassword = control.value;
      if (password !== confirmPassword) {
        return { passwordNotMatch: true };
      }
      return null;
    };
  }

  displayPassword() {
    const x = document.getElementById("password");
    if (x?.getAttribute("type") === "password") {
      x.setAttribute("type", "text");
    } else {
      x?.setAttribute("type", "password");
    }
  }

  displayConfirmPassword() {
    const x = document.getElementById("confirmPassword");
    if (x?.getAttribute("type") === "password") {
      x.setAttribute("type", "text");
    } else {
      x?.setAttribute("type", "password");
    }
  }

}
