import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url: string = 'http://localhost/rest'
  constructor(private http: HttpClient) { }

  getAllAuthor() {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.url}/Author/getAllAuthor`, null,{ headers, withCredentials: true });
  }

  postAuthor(author: any| null) {
    console.log(author)
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/Author/postAuthor(${author})`, null,{ headers, withCredentials: true });
  }

  putAuthor(id:string| null ,author: string| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/Author(${id})/putAuthor(${author})`, null,{ headers, withCredentials: true });
  }

  deleteAuthor(id: string| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/Author(${id})/deleteAuthor`, null,{ headers, withCredentials: true });
  }

}
