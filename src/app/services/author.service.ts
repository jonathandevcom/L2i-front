import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url: string = 'http://localhost/rest'
  constructor(private http: HttpClient,
              private authService : AuthService) { }

  getAllAuthor() {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Author/getAllAuthor`, null,{ headers, withCredentials: true });
  }

  postAuthor(author: any| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Author/postAuthor(${author})`, null,{ headers, withCredentials: true });
  }

  putAuthor(id:string| null ,author: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Author(${id})/putAuthor(${author})`, null,{ headers, withCredentials: true });
  }

  deleteAuthor(id: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Author(${id})/deleteAuthor`, null,{ headers, withCredentials: true });
  }

}
