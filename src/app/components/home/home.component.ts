import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import {AuthService} from "../../services/auth.service";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(
    private _httpClient: HttpClient,
    private as:ArticleService,
    private authService: AuthService
    ) {}

  article: Article[]= [];
  articleBySold: Article[]= [];
  filteredArticle: Article[] = [];
  filteredArticleByAuthor: Article[] = [];
  authorList: { firstname?: string, lastname?: string, language?: string }[] = [];

  ngOnInit(): void {

    const url = `${environment.apiUrl}/$directory/login`;
    const headers = this.authService.getHeaders();
    this._httpClient.post(url, null, { headers, withCredentials: true }).subscribe(res => {});

    this.as.getAllArticle().subscribe((res: any) => {
      this.article = res.result as Article[];
      this.articleBySold = this.article.sort((a, b) => (a.sold < b.sold) ? 1 : -1).slice(0, 4);
      this.filteredArticle = this.article;
      this.filteredArticleByAuthor = this.article;
      let authorList: { firstname?: string, lastname?: string, language?: string }[] = [];
      this.article.forEach((article) => {
        article.bookAuthor?.forEach((author) => {
          if (!authorList.some((a) => a.firstname === author.firstname && a.lastname === author.lastname)) {
            authorList.push({
              firstname: author.firstname,
              lastname: author.lastname,
              language: author.language
            });
          }
        });
      });
      authorList.sort((a, b) => {
        const lastNameComparison = (a.lastname || '').localeCompare(b.lastname || '');
        if (lastNameComparison !== 0) {
          return lastNameComparison;
        }
        return (a.firstname || '').localeCompare(b.firstname || '');
      });
      this.authorList = authorList;
    });
}

  searchArticle(event: Event) {
    event.preventDefault();
    const searchValue = (document.getElementById('searchForm') as HTMLInputElement).value;
      this.filteredArticle = this.article.filter(item => item.title?.toLowerCase().includes(searchValue.toLowerCase()));
  }

  searchAuthor(event: Event): void {
    event.preventDefault();
    const searchValue = (document.getElementById('searchAuthorValue') as HTMLInputElement).value.toLowerCase();
    this.filteredArticleByAuthor = this.article.filter(article => {
      const authors = article.bookAuthor?.map(author => `${author.firstname?.toLowerCase()} ${author.lastname?.toLowerCase()}`) || [];
      return authors.some(author => author.includes(searchValue));
    });
  }
}







