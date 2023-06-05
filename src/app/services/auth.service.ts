import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = false;
  admin = false;

  constructor(
  ) { }

  setIsLogged(value: boolean) {
    this.isLogged = value;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'username-4D': 'anonymous',
      'password-4D': 'anonymous',
      'Content-Type': 'application/json'
    });
  }

}
