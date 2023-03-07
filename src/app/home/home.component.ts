import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private _httpClient: HttpClient) {}

  article: Article[]|undefined;
  
  ngOnInit(): void {
/*
    const headers = new HttpHeaders({'username-4D':'toto', 'password-4D':'toto'});
    console.log(headers);
    
    this._httpClient.post('http://localhost/rest/$directory/login',{headers: headers}).subscribe((res) => {
      console.log(res );
    });
*/

this._httpClient.get('http://localhost/rest/User').subscribe((res) => {
  console.log(res);
});

    this._httpClient.get('https://fakestoreapi.com/products').subscribe((res) => {
    console.log(res); 

    this.article=res as Article[];

    });

  }

}
