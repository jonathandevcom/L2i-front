import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('localStorage', { static: true }) localStorage: any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
     if (localStorage.getItem('login')) {
      if (localStorage.getItem('login') === 'true') {
        this.authService.setIsLogged(true);
      }
     }

     if(localStorage.getItem('type')) {
      if (localStorage.getItem('type') === 'admin') {
        this.authService.setAdmin(true);
      }
     }

    const articleCardElement = document.getElementById('articleCard');

    if (articleCardElement) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const totalItems = cartItems.reduce((total : number, item : any) => total + parseInt(item.quantity || '0', 10), 0);
      articleCardElement.innerText = totalItems.toString();
      }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar && navbar.classList.contains('show')) {
          navbar.classList.remove('show');
        }
      });

}

  goToUserAdministration() {
    const userID = localStorage.getItem('userID');
    this.router.navigate(['/user-administration', userID]);
  }

  goToAdminAdministration() {
    const userID = localStorage.getItem('userID');
    this.router.navigate(['/admin-administration', userID]);
  }

  logout() {
    localStorage.setItem('login', 'false');
    localStorage.removeItem('userID');
    localStorage.removeItem('type');
    this.authService.setIsLogged(false);
    this.authService.setAdmin(false);
    this.router.navigate(['/login']);
  }
}
