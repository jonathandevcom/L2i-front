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


  constructor(private authorService: AuthorService) { }
  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAllAuthor().subscribe(
      (response: any) => {
        console.log(response);
        this.authors = response.result; // Mettre à jour le tableau d'auteurs avec la réponse du service
      },
      (error: any) => {
        console.log(error); // Gérer l'erreur de récupération des auteurs
      }
    );
  }

  selectAuthor(author: any): void {
    this.selectedAuthor = author; // Sélectionner l'auteur dans la dropdown
    console.log(author)
  }

  submitForm(): void {
    if (this.selectedAuthor) {
      // Modifier l'auteur existant
      // Implémentez votre logique de modification ici
      console.log('Modifier l\'auteur :', this.selectedAuthor);
    } else {
      // Ajouter un nouvel auteur
      // Implémentez votre logique d'ajout ici
      console.log('Ajouter un nouvel auteur');
    }
  }

  addAuthor(): void{
    // remettre slectedAuthor en objet vide
    this.selectedAuthor={}
  }

  updateAuthor(){

  }
  deleteAuthor(): void {
    if (this.selectedAuthor) {
      // Supprimer l'auteur sélectionné
      // Implémentez votre logique de suppression ici
      console.log('Supprimer l\'auteur :', this.selectedAuthor);
      // Réinitialiser les valeurs
      this.selectedAuthor = {};
    }
  }



  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length != 0;
  }
}


