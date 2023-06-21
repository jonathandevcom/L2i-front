import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../../services/alert.service';

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
    private authService: AuthService,
    private alertService: AlertService
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

        if(res.result.type === 'admin') {
          localStorage.setItem('type', 'admin');
          this.authService.setAdmin(true)
        }
        if(res.result.type === 'user') {
          localStorage.setItem('type', 'user');
        }
        this.authService.setIsLogged(true);
        message = res.result.message;
        this.router.navigate(['/home']);
      }
      this.alertService.showAlert(message);
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

  diplayPassword() {
    const x = document.getElementById("password");
    if (x?.getAttribute("type") === "password") {
      x.setAttribute("type", "text");
    } else {
      x?.setAttribute("type", "password");
    }
  }

}
