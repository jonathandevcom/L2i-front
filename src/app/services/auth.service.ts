import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = false;
  isAdmin = false;

  constructor(
    private router: Router
  ) { }

  setIsLogged(value: boolean) {
    this.isLogged = value;
  }

  setAdmin(value: boolean) {
    this.isAdmin = value;
  }

logout() {
  localStorage.setItem('login', 'false');
  localStorage.removeItem('userID');
  localStorage.removeItem('type');
  this.setIsLogged(false);
  this.setAdmin(false);
  this.router.navigate(['/login']);
}

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'username-4D': environment.username4D,
      'password-4D': environment.password4D,
      'Content-Type': 'application/json'
    });
  }

}
