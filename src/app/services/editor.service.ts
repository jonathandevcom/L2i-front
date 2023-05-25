import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private url: string = 'http://localhost/rest'
  constructor(private http: HttpClient,
              private authService : AuthService) { }

  getAllEditor() {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Editor/getAllEditor`, null,{ headers, withCredentials: true });
  }

  postEditor(editor: any| null) {
    console.log(editor)
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Editor/postEditor(${editor})`, null,{ headers, withCredentials: true });
  }

  putEditor(id:string| null ,editor: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Editor(${id})/putEditor(${editor})`, null,{ headers, withCredentials: true });
  }

  deleteEditor(id: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Editor(${id})/deleteEditor`, null,{ headers, withCredentials: true });
  }

}
