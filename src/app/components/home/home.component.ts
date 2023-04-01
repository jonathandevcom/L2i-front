import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  constructor(
    private router: Router,
    private _httpClient: HttpClient,
    private as:ArticleService
    ) {}

  article: Article[]= [];
  articleBySold: Article[]= [];
  searchText: string = '';
  filteredArticle: Article[] = [];
  
  ngOnInit(): void {

    const url = 'http://localhost/rest/$directory/login';
    console.log(url);
    
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    
    this._httpClient.post(url, null, { headers, withCredentials: true }).subscribe(res => {
      console.log(res);
    });

    this.as.getAllArticle().subscribe((res:any) => {
      this.article = res.result as Article[];
      console.log(this.article);
      this.articleBySold = this.article.sort((a, b) => (a.sold < b.sold) ? 1 : -1).slice(0, 4);
      this.filteredArticle = this.article;
    }


    );
    
}

goToArticleDetail(item: Article) {
 // this.router.navigate(['/article-detail', item.ID])
}

searchArticle() {
  
  alert("toto")
  if (!this.searchText) {
    this.filteredArticle = this.article;
    return;
  }

  this.filteredArticle = this.article.filter((a: Article) => {
    console.log(a.title?.toLowerCase().includes(this.searchText.toLowerCase()));
    
    return a.title?.toLowerCase().includes(this.searchText.toLowerCase());
  });
}

  
}
