import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private url: string = 'http://localhost/rest'

  constructor(private http: HttpClient) {  }

  postNewUser(item : any| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${this.url}/User/postNewUser(${item})`,null,{ headers, withCredentials: true });
  }

  login(item : any| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${this.url}/User/login(${item})`,null,{ headers, withCredentials: true });
  }
}
