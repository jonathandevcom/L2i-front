import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LegalMentionComponent } from './legal-mention/legal-mention.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


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
