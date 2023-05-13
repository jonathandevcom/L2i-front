import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors!: any[]; // Tableau d'auteurs
  authors$!: Observable<any>;
  selectedAuthor: any = {}; // Auteur sélectionné initialisé avec un objet vide
  selectedAuthorCheck: boolean = false;

  constructor(private authorService: AuthorService) { }
  ngOnInit(): void {
    this.authors$ = this.getAuthors();
  }

  getAuthors(): Observable<any> {
    return this.authorService.getAllAuthor().pipe(
      map((response: any) => {
        return response.result;
      }),
      catchError((error: any) => {
        console.log(error);
        throw error;
      })
    );
  }

  postAuthor(){
    let message: string = '';
    this.authorService.postAuthor(JSON.stringify(this.selectedAuthor).replace(/,/g, ';')).subscribe(
      (response: any) => {
        if(response.result.error){
          message = response.result.error;

          const alertElement = document.getElementById('cart-error');

          if (alertElement) {
            //afficher le message d'alerte pendant 3 secondes
            alertElement.innerHTML = message;
            alertElement.style.display = 'block';

            // masquer le message après 3 secondes
            setTimeout(function() {
              alertElement.style.display = 'none';
            }, 3000);
          }
        }

        if(response.result.success){
          message = response.result.success;
          const alertElement = document.getElementById('cart-success');

          if (alertElement) {
            //afficher le message d'alerte pendant 3 secondes
            alertElement.innerHTML = message;
            alertElement.style.display = 'block';

            // masquer le message après 3 secondes
            setTimeout(function() {
              alertElement.style.display = 'none';
            }, 3000);
          }
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  selectAuthor(author: any): void {
    this.selectedAuthor = author;
    this.selectedAuthorCheck = true
  }

  addAuthor(): void {
    // Remettre selectedAuthor en objet vide
    this.selectedAuthor = {};
    this.selectedAuthorCheck = false
  }

  updateAuthor(){
    let message: string = '';
    this.authorService.putAuthor(this.selectedAuthor.ID, JSON.stringify(this.selectedAuthor).replace(/,/g, ';')).subscribe(
      (response: any) => {
        if(response.result.error){
          message = response.result.error;

          const alertElement = document.getElementById('cart-error');

          if (alertElement) {
            //afficher le message d'alerte pendant 3 secondes
            alertElement.innerHTML = message;
            alertElement.style.display = 'block';

            // masquer le message après 3 secondes
            setTimeout(function() {
              alertElement.style.display = 'none';
            }, 3000);
          }
        }

        if(response.result.success){
          message = response.result.success;
          const alertElement = document.getElementById('cart-success');

          if (alertElement) {
            //afficher le message d'alerte pendant 3 secondes
            alertElement.innerHTML = message;
            alertElement.style.display = 'block';

            // masquer le message après 3 secondes
            setTimeout(function() {
              alertElement.style.display = 'none';
            }, 3000);
          }
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteAuthor(): void {
    let message: string = '';
    this.authorService.deleteAuthor(this.selectedAuthor.ID).subscribe(
      (response: any) => {
        if(response.result.error){
          message = response.result.error;
          const alertElement = document.getElementById('cart-error');

          if (alertElement) {
            //afficher le message d'alerte pendant 3 secondes
            alertElement.innerHTML = message;
            alertElement.style.display = 'block';

            // masquer le message après 3 secondes
            setTimeout(function() {
              alertElement.style.display = 'none';
            }, 3000);
          }
        }

        if(response.result.success){
          message = response.result.success;
          const alertElement = document.getElementById('cart-success');

          if (alertElement) {
            //afficher le message d'alerte pendant 3 secondes
            alertElement.innerHTML = message;
            alertElement.style.display = 'block';

            this.selectedAuthor = {};
            this.selectedAuthorCheck = false

            // masquer le message après 3 secondes
            setTimeout(function() {
              alertElement.style.display = 'none';
            }, 3000);
          }
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}


