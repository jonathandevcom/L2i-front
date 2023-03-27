import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LegalMentionComponent } from './components/legal-mention/legal-mention.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'article-detail/:id', component: ArticleDetailComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'legal-mention', component: LegalMentionComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
