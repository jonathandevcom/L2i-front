import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private us:UserService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]],
    });
  }

  onSubmit() {
    let message: string = '';
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }


    const item = JSON.stringify(this.loginForm.value).replace(/,/g, ';');
    this.us.login(item).subscribe((res:any) => {

      if (!res.result.login) {
        localStorage.setItem('login', 'false');
        this.authService.setIsLogged(false);
        message = res.result.error;
      }

      if (res.result.login) {
        localStorage.setItem('login', 'true');
        localStorage.setItem('userID', res.result.userID);

        this.authService.setIsLogged(true);
        message = res.result.message;
        //console.log(this.authService.getCookies())
        this.router.navigate(['/home']);
      }

    const alertElement = document.getElementById('cart-alert');

    if (alertElement) {
      //afficher le message d'alerte pendant 3 secondes
      alertElement.innerHTML = message;
      alertElement.style.display = 'block';

      // masquer le message après 3 secondes
      setTimeout(function() {
        alertElement.style.display = 'none';
      }, 3000);
    }
    });
  }

  passwordValidator(): ValidatorFn {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\-\+\_\!\?]{8,}$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      if (!passwordRegex.test(password)) {
        return { passwordInvalid: true };
      }
      return null;
    };
  }

  diplayPassword() {
    const x = document.getElementById("password");
    if (x?.getAttribute("type") === "password") {
      x.setAttribute("type", "text");
    } else {
      x?.setAttribute("type", "password");
    }
  }

}
