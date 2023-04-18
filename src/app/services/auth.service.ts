import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = false;

  setIsLogged(value: boolean) {
    this.isLogged = value;
  }  
}
