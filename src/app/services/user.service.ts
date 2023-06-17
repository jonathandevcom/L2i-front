import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost/rest';

  constructor(private http: HttpClient,
              private authService: AuthService
              ) {  }

  getAllUser(id : string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/getAllUser(${id})`, null,{ headers, withCredentials: true });
  }

  postNewUser(user : any| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/postNewUser(${user})`,null,{ headers, withCredentials: true });
  }

  login(user : any| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/login(${user})`,null,{ headers, withCredentials: true });
  }

  getUserById(id: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User(${id})/getUserById`,null,{ headers, withCredentials: true });
  }

  updateUser(id: string| null, user: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User(${id})/updateUser(${user})`,null,{ headers, withCredentials: true });
  }

  updateAddressDelivery(id: string| null, user: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User(${id})/updateAddressDelivery(${user})`,null,{ headers, withCredentials: true });
  }

  postNewUserByAdmin(user : any| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User/postNewUserByAdmin(${user})`,null,{ headers, withCredentials: true });
  }

  putUserByAdmin(id:string| null ,user: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User(${id})/updateUserByAdmin(${user})`,null,{ headers, withCredentials: true });
  }

  deleteUser(id:string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User(${id})/deleteUser`,null,{ headers, withCredentials: true });
  }

  deleteUserByAdmin(id:string| null, idAdmin:string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/User(${id})/deleteUserByAdmin(${idAdmin})`,null,{ headers, withCredentials: true });
  }

}
