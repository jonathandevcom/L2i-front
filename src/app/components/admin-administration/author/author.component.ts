import { Component, OnInit } from '@angular/core';
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

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthors();
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
    this.authorService.postAuthor(JSON.stringify(this.selectedAuthor).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
      },
      error: (error) => console.log(error),
    });
  }

  updateAuthor() {
    this.authorService.putAuthor(this.selectedAuthor.ID, JSON.stringify(this.selectedAuthor).replace(/,/g, ';')).subscribe({
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
      },
      error: (error) => console.log(error),
    });
  }

  selectAuthor(author: any): void {
    this.selectedAuthor = author;
    this.selectedAuthorCheck = true;
  }

  addAuthor(): void {
    this.selectedAuthor = {};
    this.selectedAuthorCheck = false;
  }
}
