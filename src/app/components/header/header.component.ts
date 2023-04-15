import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      // Mise à jour du nombre d'articles dans le panier
      const articleCardElement = document.getElementById('articleCard');
  
      if (articleCardElement) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
        const cartItemCount = cartItems.reduce((count: number, item: any) => count + item.quantity, 0);
        articleCardElement.innerText = cartItemCount.toString();
      }
  
  }


}
