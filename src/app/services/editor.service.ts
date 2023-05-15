import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private url: string = 'http://localhost/rest'
  constructor(private http: HttpClient) { }

  getAllEditor() {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.url}/Editor/getAllEditor`, null,{ headers, withCredentials: true });
  }

  postEditor(editor: any| null) {
    console.log(editor)
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/Editor/postEditor(${editor})`, null,{ headers, withCredentials: true });
  }

  putEditor(id:string| null ,editor: string| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/Editor(${id})/putEditor(${editor})`, null,{ headers, withCredentials: true });
  }

  deleteEditor(id: string| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/Editor(${id})/deleteEditor`, null,{ headers, withCredentials: true });
  }

}
