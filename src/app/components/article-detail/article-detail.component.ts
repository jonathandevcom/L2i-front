import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  constructor(
    private as:ArticleService,
    private route: ActivatedRoute
  ) { }

  article!: Article;

  ngOnInit(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');

    this.as.getArticleById(id).subscribe((res:any) => {
      this.article = res.result;
    });
  }

  deducQuantity(){
    const num = document.getElementById('num');
    if (num) {
      if(num.innerHTML == '1'){
        return;
      }
      num.innerHTML = (parseInt(num.innerHTML) - 1).toString();
    }
  }

  addQuantity(article:any){
    const num = document.getElementById('num');
    if (num) {
      if(num.innerHTML == "5"){
        return;
      }
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
    const num = document.getElementById('num');
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
        id: article.ID,
        title: article.title,
        image: article.image,
        summary: article.summary,
        bookEditor: article.bookEditor,
        bookTypes: article.bookTypes,
        bookAuthor: article.bookAuthor,
        priceExcludingTaxes: article.unitPriceExcludingTaxes,
        priceIncludingTaxes: article.     unitPriceIncludingTaxes,
        quantity: num?.innerHTML,
        stock: article.stock
      };

      cartItems.push(cartItem);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      message = 'L\'article a été ajouté au panier.';
    }

   // Mise à jour du nombre d'articles dans le panier
   const articleCardElement = document.getElementById('articleCard');

   if (articleCardElement) {
     const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
     const totalItems = cartItems.reduce((total : number, item : any) => total + parseInt(item.quantity || '0', 10), 0);
     articleCardElement.innerText = totalItems.toString();
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
