import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./auth.service";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = environment.apiUrl;
  constructor(private http: HttpClient,
              private authService : AuthService) { }

  getAllOrders() {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Order/getAllOrders`, null, { headers, withCredentials: true });
  }

  postNewOrder(order : any| null) {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.url}/Order/postNewOrder(${order})`,null,{ headers, withCredentials: true });
  }
}
