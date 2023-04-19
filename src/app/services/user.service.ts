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

  login(user : any| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${this.url}/User/login(${user})`,null,{ headers, withCredentials: true });
  }

  getUserById(id: string| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${this.url}/User/getUserById(${id})`,null,{ headers, withCredentials: true });
  }

  updateUser(user: string| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${this.url}/User/updateUser(${user})`,null,{ headers, withCredentials: true });
  }

  updateAddressDelivery(user: string| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    
    return this.http.post(`${this.url}/User/updateAddressDelivery(${user})`,null,{ headers, withCredentials: true });
  }


}
