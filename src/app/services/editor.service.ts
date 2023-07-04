import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./auth.service";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private url: string = environment.apiUrl;
  constructor(private http: HttpClient,
              private authService : AuthService) { }

  getAllEditor(id : string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Editor/getAllEditor(${id})`, null,{ headers, withCredentials: true });
  }

  postEditor(editor: any| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Editor/postEditor(${editor})`, null,{ headers, withCredentials: true });
  }

  putEditor(id:string| null ,editor: string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Editor(${id})/putEditor(${editor})`, null,{ headers, withCredentials: true });
  }

  deleteEditor(id: string| null, idAdmin:string| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Editor(${id})/deleteEditor(${idAdmin})`, null,{ headers, withCredentials: true });
  }

}
