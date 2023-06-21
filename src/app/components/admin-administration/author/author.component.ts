import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthorService } from '../../../services/author.service';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html'
})
export class AuthorComponent implements OnInit {

  authors!: any[];
  selectedAuthor: any = {};
  selectedAuthorCheck: boolean = false;
  authorForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private authorService: AuthorService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAuthors();

    this.authorForm = this.formBuilder.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      language: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.authorForm.invalid) {
      return;
    }
  }
  getAuthors(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    this.authorService.getAllAuthor(id).subscribe({
      next: (response: any) => {
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
        this.authors = response.result;
      },
      error: (error) => console.log(error),
    });
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
        this.getAuthors();
        setTimeout(function() {
          alertElement.style.display = 'none';
        }, 3000);
      }
    }
  }

  postAuthor() {
    if (this.authorForm.invalid) {
      return;
    }
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    const formValues = this.authorForm.value;
    const authorData = {
      id: formValues.id,
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      language: formValues.language,
      idAdmin: id
    };

    this.authorService.postAuthor(JSON.stringify(authorData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
        this.submitted = false;
        this.authorForm.patchValue({
          id: "",
          firstname: "",
          lastname: "",
          language: ""
        });
      },
      error: (error) => console.log(error),
    });
  }

  updateAuthor() {
    if (this.authorForm.invalid) {
      return;
    }
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    const formValues = this.authorForm.value;
    const authorData = {
      id: formValues.id,
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      language: formValues.language,
      idAdmin: id
    };

    this.authorService.putAuthor(this.selectedAuthor.ID, JSON.stringify(authorData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
      },
      error: (error) => console.log(error),
    });
  }

  deleteAuthor(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    this.authorService.deleteAuthor(this.selectedAuthor.ID,id).subscribe({
      next:(response: any) => {
        this.handleResponse(response);
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
        this.selectedAuthor = {};
        this.selectedAuthorCheck = false;
        this.submitted = false;
        this.authorForm.patchValue({
          id: "",
          firstname: "",
          lastname: "",
          language: ""
        });
      },
      error: (error) => console.log(error),
    });
  }

  selectAuthor(author: any): void {
    this.selectedAuthor = author;
    this.selectedAuthorCheck = true;
    this.submitted = false;

    this.authorForm.patchValue({
      id: author.id,
      firstname: author.firstname,
      lastname: author.lastname,
      language: author.language
    });
  }

  addAuthor(): void {
    this.selectedAuthor = {};
    this.selectedAuthorCheck = false;
    this.submitted = false;

    this.authorForm.patchValue({
      id: "",
      firstname: "",
      lastname: "",
      language: ""
    });
  }
}
