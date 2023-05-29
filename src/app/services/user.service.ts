import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost/rest'

  constructor(private http: HttpClient,
              private authService: AuthService
              ) {  }

  getAllUser() {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/getAllUser`, null,{ headers, withCredentials: true });
  }

  postNewUser(user : any| null) {
    const headers = this.authService.getHeaders();
    console.log(user)
    return this.http.post(`${this.url}/User/postNewUser(${user})`,null,{ headers, withCredentials: true });
  }

  login(user : any| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/login(${user})`,null,{ headers, withCredentials: true });
  }

  getUserById(id: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/getUserById(${id})`,null,{ headers, withCredentials: true });
  }

  updateUser(user: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/updateUser(${user})`,null,{ headers, withCredentials: true });
  }

  updateAddressDelivery(user: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/updateAddressDelivery(${user})`,null,{ headers, withCredentials: true });
  }

  postNewUserByAdmin(user : any| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/postNewUserByAdmin(${user})`,null,{ headers, withCredentials: true });
  }

  putUserByAdmin(id:string| null ,user: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User(${id})/updateUserByAdmin(${user})`,null,{ headers, withCredentials: true });
  }

  deleteUserByAdmin(id:string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User(${id})/deleteUserByAdmin`,null,{ headers, withCredentials: true });
  }

}
