import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserAdministrationComponent } from './components/user-administration/user-administration.component';
import { AdminAdministrationComponent } from './components/admin-administration/admin-administration.component';
import { LegalMentionComponent } from './components/legal-mention/legal-mention.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'article-detail/:id', component: ArticleDetailComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'user-administration/:id', component: UserAdministrationComponent },
  { path: 'admin-administration/:id', component: AdminAdministrationComponent },
  { path: 'legal-mention', component: LegalMentionComponent },
  { path: 'payment-page', component: PaymentPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
