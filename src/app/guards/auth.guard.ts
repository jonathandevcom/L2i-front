import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoles: Array<string> = [];
    const actualRole = localStorage.getItem('type');

    if (route.data['role']) {
      expectedRoles.push(route.data['role']);
    } else if (route.data['roles']) {
      expectedRoles = [...route.data['roles']];
    }

    if (!actualRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRoles.includes(actualRole)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
