import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url: string = 'http://localhost/rest/Article'

  constructor(private http: HttpClient) {  }

  getAllArticle() {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });

      return this.http.post(`${this.url}/getAllArticle`, null,{ headers, withCredentials: true });
   }

}