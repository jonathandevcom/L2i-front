import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url: string = 'http://localhost/rest'

  constructor(private http: HttpClient) {  }

  getAllArticle() {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });

      return this.http.post(`${this.url}/Article/getAllArticle`, null,{ headers, withCredentials: true });
   }

    getArticleById(id: string| null) {
      const headers = new HttpHeaders({
        'username-4D': 'toto',
        'password-4D': 'toto',
        'Content-Type': 'application/json'
      });
    //  return this.http.post(`${this.url}/Article(${id})/toto()`,null,{ headers, withCredentials: true });

      return this.http.post(`${this.url}/Article/getArticleById(${id})`,null,{ headers, withCredentials: true });
    }
}
