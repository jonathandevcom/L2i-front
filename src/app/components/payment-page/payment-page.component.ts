import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from "../../services/order.service";

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  totalExcludingTaxes = 0;
  totalIncludingTaxes = 0;
  taxes = 0;
  success = false;
  message: string = '';
  constructor(
    private router: Router,
    private os: OrderService
  ) { }

  ngOnInit(): void {
    this.calculateTotal();
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

  payement() {
    // message de confirmation en utilisant mon alert componant
    this.success=true;
    this.message='Votre paiement a été validée avec succès !';
    localStorage.removeItem('cartItems');

    setTimeout(() => {
      this.success=false;
      this.message='';
      this.router.navigate(['../home']);

      // Mise à jour du nombre d'articles dans le panier
      const articleCardElement = document.getElementById('articleCard');

      if (articleCardElement) {
        articleCardElement.innerText = "0";
      }
        }, 2000);

    // Envoi de la commande au serveur
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    // suprimer image et description de l'objet pour éviter les erreurs de parse
    cartItems.forEach((item : any) => {
      delete item.image;
      delete item.summary;
    });
    console.log(cartItems)

    const order = {
      userID: localStorage.getItem('userID'),
      items: cartItems,
      totalExcludingTaxes: this.totalExcludingTaxes,
      totalIncludingTaxes: this.totalIncludingTaxes,
      taxes: this.taxes
    };
    console.log(order)
    const oderString = JSON.stringify(order).replace(/,/g, ';');

    this.os.postNewOrder(oderString).subscribe((res:any) => {
      console.log(res);
    });
  }
}
