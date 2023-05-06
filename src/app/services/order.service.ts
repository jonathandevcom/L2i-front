import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = 'http://localhost/rest'
  constructor(private http: HttpClient) { }

  postNewOrder(order : any| null) {
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.url}/Order/postNewOrder(${order})`,null,{ headers, withCredentials: true });
  }
}
