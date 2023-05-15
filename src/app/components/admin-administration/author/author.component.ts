import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthorService } from '../../../services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors!: any[]; // Tableau d'auteurs
  selectedAuthor: any = {}; // Auteur sélectionné initialisé avec un objet vide
  selectedAuthorCheck: boolean = false;
  authorForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.getAuthors();

    this.authorForm = this.formBuilder.group({
      id: [''], // Ajouter les autres champs ici avec leurs validations
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      language: ['', Validators.required]
    });
  }

  onSubmit() {
    let message: string = '';
    this.submitted = true;
    console.log(this.authorForm.invalid)
    if (this.authorForm.invalid) {
      return;
    }
  }
  getAuthors(): void {
    this.authorService.getAllAuthor().subscribe({
      next: (response: any) => {
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

    const formValues = this.authorForm.value;
    const authorData = {
      id: formValues.id,
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      language: formValues.language
    };

    this.authorService.postAuthor(JSON.stringify(authorData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
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

    const formValues = this.authorForm.value;
    const authorData = {
      id: formValues.id,
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      language: formValues.language
    };

    this.authorService.putAuthor(this.selectedAuthor.ID, JSON.stringify(authorData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
      },
      error: (error) => console.log(error),
    });
  }


  deleteAuthor(): void {
    this.authorService.deleteAuthor(this.selectedAuthor.ID).subscribe({
      next:(response: any) => {
        this.handleResponse(response);
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

    // Mettre à jour les valeurs du formulaire
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
    // Mettre à jour les valeurs du formulaire
    this.authorForm.patchValue({
      id: "",
      firstname: "",
      lastname: "",
      language: ""
    });
  }
}
