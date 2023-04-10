import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../../interfaces/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {
  constructor(
    private _httpClient: HttpClient,
    private as:ArticleService,
    private route: ActivatedRoute
    ) { }

    article!: Article;

  ngOnInit(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    
    this.as.getArticleById(id).subscribe((res:any) => {
      console.log(res);
      this.article = res.result;
    });
  }

}
