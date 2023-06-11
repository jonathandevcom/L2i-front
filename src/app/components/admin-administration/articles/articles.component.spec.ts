
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {ArticleService} from "../../../services/article.service";
import {AuthorService} from "../../../services/author.service";
import {EditorService} from "../../../services/editor.service";
import {TypeService} from "../../../services/type.service";

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [ FormBuilder,
        ArticleService,
       AuthorService,
       EditorService,
       TypeService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.selectedArticleCheck).toBeFalse();
  });
});
