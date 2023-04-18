import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('localStorage', { static: true }) localStorage: any;
  
    
  isLogged: boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const articleCardElement = document.getElementById('articleCard');

    if (articleCardElement) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const totalItems = cartItems.reduce((total : number, item : any) => total + parseInt(item.quantity || '0', 10), 0);
      articleCardElement.innerText = totalItems.toString();
      }
  }

  logout() {
    localStorage.setItem('login', 'false');
    this.authService.setIsLogged(false);
    this.router.navigate(['/login']);
  }
    


}
