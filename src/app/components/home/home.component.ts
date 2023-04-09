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
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'multipart/form-data'
    });
    
    this._httpClient.post(url, null, { headers, withCredentials: true }).subscribe(res => {
      console.log(res);
    });

    this.as.getAllArticle().subscribe((res:any) => {
      this.article = res.result as Article[];
      this.articleBySold = this.article.sort((a, b) => (a.sold < b.sold) ? 1 : -1).slice(0, 4);
      this.filteredArticle = this.article;
    });
}

goToArticleDetail(item: Article) {
  this.router.navigate(['/article-detail', item.ID], { state: { data: item } });
}

searchArticle(event: Event) {
  event.preventDefault();
  const searchValue = (document.getElementById('searchForm') as HTMLInputElement).value; 
    this.filteredArticle = this.article.filter(item => item.title?.toLowerCase().includes(searchValue.toLowerCase()));
  }
 
}

  

