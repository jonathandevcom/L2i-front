import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private url: string = 'http://localhost/rest'
  constructor(private http: HttpClient,
              private authService : AuthService) { }

  getAllType(id : string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Type/getAllType(${id})`, null,{ headers, withCredentials: true });
  }

  postType(type: any| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Type/postType(${type})`, null,{ headers, withCredentials: true });
  }

  putType(id:string| null ,type: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Type(${id})/putType(${type})`, null,{ headers, withCredentials: true });
  }

  deleteType(id: string| null, idAdmin:string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Type(${id})/deleteType(${idAdmin})`, null,{ headers, withCredentials: true });
  }

}
