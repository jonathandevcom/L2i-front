import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LegalMentionComponent } from './components/legal-mention/legal-mention.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserAdministrationComponent } from './components/user-administration/user-administration.component';
import { CardArticleComponent } from './components/card-article/card-article.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    ArticleDetailComponent,
    ShoppingCartComponent,
    LegalMentionComponent,
    PageNotFoundComponent,
    UserAdministrationComponent,
    CardArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
