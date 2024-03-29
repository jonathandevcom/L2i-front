import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./auth.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url: string = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService : AuthService) {  }

  getAllArticle() {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Article/getAllArticle()`, null,{ headers, withCredentials: true });
   }

   getArticleById(id: string| null) {
      const headers = this.authService.getHeaders();
      return this.http.post(`${this.url}/Article(${id})/getArticleById`,null,{ headers, withCredentials: true });
    }

   postArticle(article: any) {
      const headers = this.authService.getHeaders();
      return this.http.post(`${this.url}/Article/postArticle(${article})`, null,{ headers, withCredentials: true });
      }

    putArticle(id:string| null, article: any) {
        const headers = this.authService.getHeaders();
        return this.http.post(`${this.url}/Article(${id})/putArticle(${article})`, null,{ headers, withCredentials: true });
    }

    deleteArticle(id: string| null, idAdmin: string| null) {
        const headers = this.authService.getHeaders();
        return this.http.post(`${this.url}/Article(${id})/deleteArticle(${idAdmin})`, null,{ headers, withCredentials: true });
    }



}
