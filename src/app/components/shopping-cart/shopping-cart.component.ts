import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Récupérer les éléments stockés dans le localStorage
    const storedItems = localStorage.getItem('cartItems');

    if (storedItems) {
      // Convertir la chaîne JSON en tableau d'objets
      this.cartItems = JSON.parse(storedItems);
      console.log(this.cartItems);
      
    }
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


}
