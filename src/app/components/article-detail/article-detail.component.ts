import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent {
  @Input() article: Article  = {}
  constructor(private route: ActivatedRoute) { }

  item: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.item = params['id'];
      console.log(this.item);
      
    });

    
  }

}
