import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Article } from '../../../interfaces/article';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articlesList: Article[]= [];
  selectedArticle: any;
  selectedArticleCheck: boolean = false;
  authorList: { firstname?: string, lastname?: string, language?: string }[] = [];
  articleForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private as:ArticleService
  ) { }

  ngOnInit(): void {
    this.getArticles();

    this.articleForm = this.formBuilder.group({
      ISBN: ['', Validators.required],
      bookAuthor: ['', Validators.required],
      bookEditor: ['', Validators.required],
      bookType: ['', Validators.required],
      format: ['', Validators.required],
      image: ['', Validators.required],
      sold: ['', Validators.required],
      stock: ['', Validators.required],
      summary: ['', Validators.required],
      title: ['', Validators.required],
      unitPriceExcludingTaxes: ['', Validators.required],
      unitPriceIncludingTaxes: ['', Validators.required],
    });
  }

  onSubmit() {
    let message: string = '';
    this.submitted = true;
    if (this.articleForm.invalid) {
      return;
    }
  }

  handleResponse(response: any): void {
    let message: string = '';
    if (response.result.error) {
      message = response.result.error;
      const alertElement = document.getElementById('cart-error');
      if (alertElement) {
        alertElement.innerHTML = message;
        alertElement.style.display = 'block';
        setTimeout(function() {
          alertElement.style.display = 'none';
        }, 3000);
      }
    }

    if (response.result.success) {
      message = response.result.success;
      const alertElement = document.getElementById('cart-success');
      if (alertElement) {
        alertElement.innerHTML = message;
        alertElement.style.display = 'block';
        this.getArticles();
        setTimeout(function() {
          alertElement.style.display = 'none';
        }, 3000);
      }
    }
  }

  getArticles(): void {
    this.as.getAllArticle().subscribe((res: any) => {
      this.articlesList = res.result as Article[];
      console.log(this.articlesList)
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
  selectArticle(article: any) {
    this.selectedArticle = article;
    this.selectedArticleCheck = true;
    this.submitted = false;

    // Mettre à jour les valeurs du formulaire
    this.articleForm.patchValue({
      ISBN: article.ISBN13,
      bookAuthor: article.bookAuthor,
      bookEditor: article.bookEditor,
      bookType: article.bookType,
      format: article.format,
      image: article.image,
      sold: article.sold,
      stock: article.stock,
      summary: article.summary,
      title: article.title,
      unitPriceExcludingTaxes: article.unitPriceExcludingTaxes,
      unitPriceIncludingTaxes: article.unitPriceIncludingTaxes,
    });
  }

  postArticle() {

  }

  updateArticle() {

  }

  deleteArticle() {

  }

  addArticle() {
    this.selectedArticle = {};
    this.selectedArticleCheck = false;
    this.submitted = false;
    this.articleForm.patchValue({
      ISBN: '',
      bookAuthor: '',
      bookEditor: '',
      bookType: '',
      format: '',
      image: '',
      sold: '',
      stock: '',
      summary: '',
      title: '',
      unitPriceExcludingTaxes: '',
      unitPriceIncludingTaxes: '',
    })
  }

}


