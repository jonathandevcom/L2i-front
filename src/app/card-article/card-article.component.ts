import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.css']
})
export class CardArticleComponent {

  @Input() article!: Article;
 
  constructor(
    private router: Router,
  ) { }

goToArticleDetail(item: Article) {
  this.router.navigate(['/article-detail', item.ID], { state: { data: item } });
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

