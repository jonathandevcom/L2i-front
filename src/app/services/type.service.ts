import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private url: string = 'http://localhost/rest'
  constructor(private http: HttpClient) { }

  getAllType() {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.url}/Type/getAllType`, null,{ headers, withCredentials: true });
  }

  postType(type: any| null) {
    console.log(type)
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/Type/postType(${type})`, null,{ headers, withCredentials: true });
  }

  putType(id:string| null ,type: string| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/Type(${id})/putType(${type})`, null,{ headers, withCredentials: true });
  }

  deleteType(id: string| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/Type(${id})/deleteType`, null,{ headers, withCredentials: true });
  }

}
