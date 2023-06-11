import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Article } from '../../../interfaces/article';
import { ArticleService } from '../../../services/article.service';
import { AuthorService } from '../../../services/author.service';
import { EditorService } from '../../../services/editor.service';
import { TypeService } from '../../../services/type.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articlesList: Article[]= [];
  authors!: any[];
  editors!: any[];
  types!: any[];

  selectedArticle: any;
  selectedArticleCheck: boolean = false;

  authorList: { id?: string, firstname?: string, lastname?: string, language?: string }[] = [];
  typeList: { id?: string, typeName?: string }[] = [];
  editorList: { id?: string, name?: string }[] = [];
  imageBook: string = "";

  articleForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private as:ArticleService,
    private authorService: AuthorService,
    private editorService: EditorService,
    private typeService: TypeService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getArticles();
    this.getAuthors();
    this.getEditors();
    this.getTypes();

    this.articleForm = this.formBuilder.group({
      ISBN: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      format: ['', Validators.required],
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

  handleImageSelection(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedTypes.includes(file.type)) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageBook = e.target.result.split(',')[1];
      };

      reader.readAsDataURL(file);
    } else {
      this.imageBook = '';
      let response = {
        result: {
          error: 'Format de fichier non pris en charge'
        }
      }
      this.handleResponse(response);
    }
  }

  addAuthor(authorIndex: number) {
    if (authorIndex !== 0) {
      const selectedAuthor = this.authors[authorIndex - 1];
      if (selectedAuthor && !this.authorList.includes(selectedAuthor)) {
        // Vérifier si le lastname et firstname sont identiques
        const isIdentical = this.authorList.some((author) =>
          author.lastname === selectedAuthor.lastname &&
          author.firstname === selectedAuthor.firstname
        );
        if (!isIdentical) {
          this.authorList.push(selectedAuthor);
        }
      }
    }
  }

  removeAuthor(author: any) {
    const index = this.authorList.indexOf(author);
    if (index !== -1) {
      this.authorList.splice(index, 1);
    }
  }

  addType(typeIndex: number) {
    if (typeIndex !== 0) {
      const selectedType = this.types[typeIndex - 1];
      if (selectedType && !this.typeList.includes(selectedType)) {
        // Vérifier si le nameType est identique
        const isIdentical = this.typeList.some((type) =>
          type.typeName === selectedType.typeName
        );
        if (!isIdentical) {
          this.typeList.push(selectedType);
        }
      }
    }
  }

  removeType(type: any) {
     const index = this.typeList.indexOf(type);
      if (index !== -1) {
        this.typeList.splice(index, 1);
    }
  }

  addEditor(editorIndex: number) {
    if (editorIndex !== 0) {
      const selectedEditor = this.editors[editorIndex - 1];
      if (selectedEditor) {
        this.editorList = [selectedEditor];
      }
    }
  }

  getArticles(): void {
    this.as.getAllArticle().subscribe({
      next: (response: any) => {
        this.articlesList = response.result;
        console.log(this.articlesList)
      },
      error: (error) => console.log(error),
    });
    }

  getAuthors(): void {
    this.authorService.getAllAuthor().subscribe({
      next: (response: any) => {
        this.authors = response.result;
      },
      error: (error) => console.log(error),
    });
  }

  getEditors(): void {
    this.editorService.getAllEditor().subscribe({
      next: (response: any) => {
        this.editors = response.result;
      },
      error: (error) => console.log(error),
    });
  }

  getTypes(): void {
    this.typeService.getAllType().subscribe({
      next: (response: any) => {
        this.types = response.result;
      },
      error: (error) => console.log(error),
    });
  }

  selectArticle(article: any) {
    console.log(article)
    this.selectedArticle = article;
    this.selectedArticleCheck = true;
    this.submitted = false;

    this.authorList = article.bookAuthor;
    this.editorList = article.bookEditor;
    this.typeList = article.booktypes;

    this.imageBook = article.image;

    this.articleForm.patchValue({
      ISBN: article.ISBN13,
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
    if (this.articleForm.invalid) {
      return;
    }
    const formValues = this.articleForm.value;

    const articleData = {
      bookAuthor : this.authorList,
      bookEditor : this.editorList,
      booktypes : this.typeList,
      image : this.imageBook,
      ISBN13 : formValues.ISBN,
      format : formValues.format,
      sold : formValues.sold,
      stock : formValues.stock,
      summary : formValues.summary,
      title : formValues.title,
      unitPriceExcludingTaxes : formValues.unitPriceExcludingTaxes,
      unitPriceIncludingTaxes : formValues.unitPriceIncludingTaxes,
    }

    this.as.postArticle(JSON.stringify(articleData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
        this.getArticles();
      },
      error: (error) => console.log(error),
    });
  }

  updateArticle() {
    if (this.articleForm.invalid) {
      return;
    }
    const formValues = this.articleForm.value;

    const articleData = {
      bookAuthor : this.authorList,
      bookEditor : this.editorList,
      booktypes : this.typeList,
      image : this.imageBook,
      ISBN13 : formValues.ISBN,
      format : formValues.format,
      sold : formValues.sold,
      stock : formValues.stock,
      summary : formValues.summary,
      title : formValues.title,
      unitPriceExcludingTaxes : formValues.unitPriceExcludingTaxes,
      unitPriceIncludingTaxes : formValues.unitPriceIncludingTaxes,
    }

    this.as.putArticle(this.selectedArticle.ID, JSON.stringify(articleData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
        this.getArticles();
      },
      error: (error) => console.log(error),
    });
  }

  deleteArticle() {
    this.as.deleteArticle(this.selectedArticle.ID).subscribe({
      next: (response: any) => {
        this.checkCookie(response.result.disconnect)
        this.handleResponse(response);
        this.getArticles();
        this.addArticle();
      },
      error: (error) => console.log(error),
    });
  }

  addArticle() {
    this.selectedArticle = {};
    this.selectedArticleCheck = false;
    this.submitted = false;
    this.authorList = [];
    this.typeList = [];
    this.editorList = [];
    this.imageBook = "";
    this.articleForm.patchValue({
      ISBN: '',
      format: '',
      sold: '',
      stock: '',
      summary: '',
      title: '',
      unitPriceExcludingTaxes: '',
      unitPriceIncludingTaxes: '',
    })
  }

  checkCookie(check:boolean) {
    if (check) {
      setTimeout(() => {
        localStorage.setItem('login', 'false');
        localStorage.removeItem('userID');
        this.authService.setIsLogged(false);
        this.router.navigate(['/login']);
      }, 2000);
    }
  }

}


