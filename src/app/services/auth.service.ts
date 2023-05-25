import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = false;

  constructor(
    private cookieService: CookieService
  ) { }

  getCookies(): any {
    this.cookieService.set('Test', 'Hello World');
    const cookieValue = this.cookieService.get('WASID4D');
    const allCookies: {} = this.cookieService.getAll();
    console.log(cookieValue)
    console.log(allCookies)
    // problème de lecture des cookies httpOnly

  }


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
