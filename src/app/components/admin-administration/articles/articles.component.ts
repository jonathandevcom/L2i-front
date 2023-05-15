import { Component, OnInit } from '@angular/core';
import { Article } from '../../../interfaces/article';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(
    private as:ArticleService
  ) { }

  articlesList: Article[]= [];
  authorList: { firstname?: string, lastname?: string, language?: string }[] = [];

  ngOnInit(): void {

    this.as.getAllArticle().subscribe((res: any) => {
      this.articlesList = res.result as Article[];
      let authorList: { firstname?: string, lastname?: string, language?: string }[] = [];
      this.articlesList.forEach((articlesList) => {
        articlesList.bookAuthor?.forEach((author) => {
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

}
