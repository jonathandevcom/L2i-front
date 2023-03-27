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

    const url = 'http://localhost/rest/$directory/login';
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    
    this._httpClient.post(url, null, { headers, withCredentials: true }).subscribe(res => {
      console.log(res);
    });

    this._httpClient.post('http://localhost/rest/Article/getAllArticle', null).subscribe((res:any) => {
      this.article = res.result as Article[];
    });
}

  

}
