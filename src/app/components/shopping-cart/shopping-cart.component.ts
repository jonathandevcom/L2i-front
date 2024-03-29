import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: any[] = [];
  totalExcludingTaxes = 0;
  totalIncludingTaxes = 0;
  taxes = 0;
  user!: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private us:UserService
  ) { }

  ngOnInit(): void {
    const storedItems = localStorage.getItem('cartItems');

    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
    this.calculateTotal()
  }

  goToArticleDetail(item: any) {
    this.router.navigate(['/article-detail', item.id], { state: { data: item } });
  }

  goToUserAdministration() {
    const id = localStorage.getItem('userID');
    this.router.navigate(['/user-administration', id]);
  }

  deducQuantity(article: any){
    if (article.quantity == 1) {
      return
    }

    const index = this.cartItems.findIndex((item) => item.id === article.id);

    this.cartItems[index].quantity--;

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    const productClass = `.product-${article.ID}`;
    const quantityElement = document.querySelector(`${productClass} .num`);
    if (quantityElement) {
      quantityElement.textContent = this.cartItems[index].quantity;
    }

    const priceElement = document.querySelectorAll(`${productClass} td`)[2];
    if (priceElement) {
    priceElement.textContent = `${this.cartItems[index].priceIncludingTaxes * this.cartItems[index].quantity} €`;
    }
    this.calculateTotal()
  }

  addQuantity(article:any){
    if(article.quantity == "5"){
      return;
    }
    if(article.quantity == article.stock){
      return;
    }
    const index = this.cartItems.findIndex((item) => item.id === article.id);
    this.cartItems[index].quantity++;

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    const productClass = `.product-${article.ID}`;
    const quantityElement = document.querySelector(`${productClass} .num`);
    if (quantityElement) {
      quantityElement.textContent = this.cartItems[index].quantity;
    }

    const priceElement = document.querySelectorAll(`${productClass} td`)[2];
    if (priceElement) {
      priceElement.textContent = `${(this.cartItems[index].priceIncludingTaxes * this.cartItems[index].quantity).toFixed(2)} €`;
    }
    this.calculateTotal()
  }

  deleteArticleCart(article: any) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
    const index = cartItems.findIndex((item: any) => item.title === article.title);
    if (index > -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        const cartTable = document.querySelector('.table-responsive table');
        const cartTableRows = cartTable?.querySelectorAll('tr');
        cartTableRows?.forEach((row, rowIndex) => {
            if (rowIndex === index + 1) {
                row.remove();
            } else if (rowIndex > index) {
                row.querySelector('td:last-child')?.setAttribute('data-row-index', (rowIndex - 1).toString());
            }
        });

        // Mise à jour du nombre d'articles dans le panier
        const articleCardElement = document.getElementById('articleCard');
        if (articleCardElement) {
            const totalItems = cartItems.reduce((total : number, item : any) => total + parseInt(item.quantity || '0', 10), 0);
            articleCardElement.innerText = totalItems.toString();
        }
        this.cartItems = cartItems;
    }
    this.calculateTotal()
  }

  validateOrder() {
    if (!this.authService.isLogged) {
      const alertElement = document.getElementById('cart-error');
      if (alertElement) {
        alertElement.innerHTML = 'Vous devez être connecté pour valider votre commande';
        alertElement.style.display = 'block';
        setTimeout(() => {
          alertElement.style.display = 'none';
          this.router.navigate(['/login']);
        }, 3000);
      }
    } else {
      const userId = localStorage.getItem('userID');
      if(userId){
        this.us.getUserById(userId).subscribe((res:any) => {
          this.user = res.result;
        });
      }
    }
  }

  calculateTotal() {
    this.totalExcludingTaxes = 0;
    this.totalIncludingTaxes = 0;
    this.taxes = 0;

    const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');

    cartItems.forEach((item : any) => {
      this.totalExcludingTaxes += item.priceExcludingTaxes * item.quantity;
      this.totalIncludingTaxes += item.priceIncludingTaxes * item.quantity;
    });

      this.taxes  = this.totalIncludingTaxes - this.totalExcludingTaxes;
  }

}
