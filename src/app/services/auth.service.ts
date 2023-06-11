import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = false;
  isAdmin = false;

  constructor(
  ) { }

  setIsLogged(value: boolean) {
    this.isLogged = value;
  }

  setAdmin(value: boolean) {
    this.isAdmin = value;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'username-4D': environment.username4D,
      'password-4D': environment.password4D,
      'Content-Type': 'application/json'
    });
  }

}
