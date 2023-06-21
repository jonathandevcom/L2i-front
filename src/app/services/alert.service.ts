import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() { }

  showAlert(message: string, id: string = 'cart-error') {
    const alertElement = document.getElementById(id);
    if (alertElement) {
      alertElement.innerHTML = message;
      alertElement.style.display = 'block';
      setTimeout(function() {
        alertElement.style.display = 'none';
      }, 3000);
    }
  }
}
