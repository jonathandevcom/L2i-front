import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  constructor(
    private router: Router,
    private _httpClient: HttpClient,
    private as:ArticleService
    ) {}

  article: Article[]= [];
  articleBySold: Article[]= [];
  searchText: string = '';
  filteredArticle: Article[] = [];
  filteredArticleByAuthor: Article[] = [];
  searchAuthorValue: Article[] = [];
  authorList: { firstname?: string, lastname?: string, language?: string }[] = [];

  ngOnInit(): void {

    const url = 'http://localhost/rest/$directory/login';
    const headers = new HttpHeaders({
      'username-4D': 'toto',
      'password-4D': 'toto',
      'Content-Type': 'application/json'
    });
    
    this._httpClient.post(url, null, { headers, withCredentials: true }).subscribe(res => {});

    this.as.getAllArticle().subscribe((res: any) => {
      this.article = res.result as Article[];
      this.articleBySold = this.article.sort((a, b) => (a.sold < b.sold) ? 1 : -1).slice(0, 4);
      this.filteredArticle = this.article;
      this.filteredArticleByAuthor = this.article;
      let authorList: { firstname?: string, lastname?: string, language?: string }[] = [];
      this.article.forEach((article) => {
        article.bookAuthor?.forEach((author) => {
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

goToArticleDetail(item: Article) {
  this.router.navigate(['/article-detail', item.ID], { state: { data: item } });
}

searchArticle(event: Event) {
  event.preventDefault();
  const searchValue = (document.getElementById('searchForm') as HTMLInputElement).value; 
    this.filteredArticle = this.article.filter(item => item.title?.toLowerCase().includes(searchValue.toLowerCase()));
  }
 
searchAuthor(event: Event): void {
  event.preventDefault();
  const searchValue = (document.getElementById('searchAuthorValue') as HTMLInputElement).value.toLowerCase();
  this.filteredArticleByAuthor = this.article.filter(article => {
    const authors = article.bookAuthor?.map(author => `${author.firstname?.toLowerCase()} ${author.lastname?.toLowerCase()}`) || [];
    return authors.some(author => author.includes(searchValue));
  });
}

deducQuantity(article: any){
  const num = document.querySelector('.product-' + article.ID + ' .num');

  if (num) {
    if(num.innerHTML == '1'){
      return;
    }
    num.innerHTML = (parseInt(num.innerHTML) - 1).toString();
    console.log(num.innerHTML);
  }
}

addQuantity(article:any){
  const num = document.querySelector('.product-' + article.ID + ' .num');

  if (num) {      
    if(num.innerHTML == article.stock){
      return;
    }
    num.innerHTML = (parseInt(num.innerHTML) + 1).toString();
  }
}

addToCart(article: any) {
  const articleTitle = article.title;

  // Vérification si l'article est déjà présent dans le local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
  const existingItemIndex = cartItems.findIndex((item: any) => item.title === articleTitle);
  const num = document.querySelector('.product-' + article.ID + ' .num');
  let message: string = '';

  if (existingItemIndex !== -1 && num) {
    // Si l'article existe déjà, incrémenter la quantité

    if(parseInt(cartItems[existingItemIndex].quantity) +parseInt(num.innerHTML)> article.stock){
      cartItems[existingItemIndex].quantity = article.stock
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      message = 'La nouvelle quantité a été mise à jour, vous ne pouvez pas commander plus de '+article.stock+' exemplaires.';
    } else {
      cartItems[existingItemIndex].quantity = parseInt(cartItems[existingItemIndex].quantity) +parseInt(num.innerHTML);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      message = 'La quantité de l\'article a été augmentée.';
    }
  } else {
    // Ajout de l'article dans le local storage
    const cartItem = {
      title: articleTitle,
      image: article.image,
      summary: article.summary,
      bookEditor: article.bookEditor,
      bookTypes: article.bookTypes,
      bookAuthor: article.bookAuthor,
      quantity: num?.innerHTML
    };
    
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    message = 'L\'article a été ajouté au panier.';
  }

  // Mise à jour du nombre d'articles dans le panier
const articleCardElement = document.getElementById('articleCard');

if (articleCardElement) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
  const cartItemCount = cartItems.reduce((count: number, item: any) => count + item.quantity, 0);
  articleCardElement.innerText = cartItemCount.toString();
}

  // Affichage du message d'alerte Bootstrap
  const alertElement = document.getElementById('cart-alert');
  
  if (alertElement) {
    //afficher le message d'alerte pendant 5 secondes

    alertElement.innerHTML = message;
    alertElement.style.display = 'block';

      // masquer le message après 5 secondes
    setTimeout(function() {
      alertElement.style.display = 'none';
    }, 3000);
  }
}
}
  
  



  

