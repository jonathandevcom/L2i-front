import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url: string = 'http://localhost/rest'

  constructor(private http: HttpClient,
              private authService : AuthService) {  }

  getAllArticle() {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Article/getAllArticle`, null,{ headers, withCredentials: true });
   }

    getArticleById(id: string| null) {
      const headers = this.authService.getHeaders();
    //  return this.http.post(`${this.url}/Article(${id})/toto()`,null,{ headers, withCredentials: true });

      return this.http.post(`${this.url}/Article/getArticleById(${id})`,null,{ headers, withCredentials: true });
    }

    postArticle(article: any) {
      const headers = this.authService.getHeaders();
      return this.http.post(`${this.url}/Article/postArticle(${article})`, null,{ headers, withCredentials: true });
      }
}
